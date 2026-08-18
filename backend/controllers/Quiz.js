const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { callGeminiJSON } = require("../utils/geminiClient");

// ********************************************************************************************************
//                              Generate (or fetch cached) quiz for a lecture
// ********************************************************************************************************
// POST /api/v1/quiz/generate
// body: { subSectionId, courseId, numQuestions?, regenerate? }
exports.generateQuiz = async (req, res) => {
  try {
    const { subSectionId, courseId, numQuestions = 5, regenerate = false } = req.body;

    if (!subSectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "subSectionId and courseId are required",
      });
    }

    // Return the cached quiz unless the caller explicitly wants a new one
    if (!regenerate) {
      const existingQuiz = await Quiz.findOne({ subSection: subSectionId });
      if (existingQuiz) {
        return res.status(200).json({
          success: true,
          message: "Quiz fetched successfully",
          data: existingQuiz,
        });
      }
    }

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    const lectureContext = `Lecture Title: ${subSection.title || "Untitled"}
Lecture Description: ${subSection.description || "No description provided"}`;

    const prompt = `You are an instructional designer creating a short quiz for an online course lecture.

${lectureContext}

Generate exactly ${numQuestions} multiple-choice questions that test understanding of the concepts likely covered in this lecture, based on its title and description. Each question must have exactly 4 answer options, only one of which is correct.

Respond ONLY with valid JSON matching this exact shape, and nothing else:
{
  "questions": [
    {
      "questionText": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswerIndex": 0,
      "explanation": "one sentence explaining why the answer is correct"
    }
  ]
}`;

    let generated;
    try {
      generated = await callGeminiJSON(prompt);
    } catch (aiError) {
      console.error("Gemini quiz generation failed:", aiError.message);
      return res.status(502).json({
        success: false,
        message: "Could not generate quiz right now, please try again shortly",
        error: aiError.message,
      });
    }

    const questions = Array.isArray(generated?.questions) ? generated.questions : [];
    if (!questions.length) {
      return res.status(502).json({
        success: false,
        message: "AI did not return any quiz questions, please try again",
      });
    }

    const quizDoc = await Quiz.findOneAndUpdate(
      { subSection: subSectionId },
      {
        subSection: subSectionId,
        course: courseId,
        questions,
        generatedBy: "gemini",
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Quiz generated successfully",
      data: quizDoc,
    });
  } catch (error) {
    console.error("generateQuiz error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ********************************************************************************************************
//                                      Submit a quiz attempt
// ********************************************************************************************************
// POST /api/v1/quiz/submit
// body: { quizId, subSectionId, courseId, answers: number[] }
exports.submitQuizAttempt = async (req, res) => {
  try {
    const { quizId, subSectionId, courseId, answers } = req.body;
    const userId = req.user.id;

    if (!quizId || !subSectionId || !courseId || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "quizId, subSectionId, courseId and answers[] are required",
      });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswerIndex) score += 1;
    });

    const attempt = await QuizAttempt.create({
      user: userId,
      quiz: quizId,
      subSection: subSectionId,
      course: courseId,
      answers,
      score,
      totalQuestions: quiz.questions.length,
    });

    return res.status(200).json({
      success: true,
      message: "Quiz submitted successfully",
      data: {
        attemptId: attempt._id,
        score,
        totalQuestions: quiz.questions.length,
        questions: quiz.questions, // include correct answers + explanations for review
      },
    });
  } catch (error) {
    console.error("submitQuizAttempt error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ********************************************************************************************************
//                              AI Tutor: explain any concept on demand
// ********************************************************************************************************
// POST /api/v1/quiz/explain   body: { question, level }  (level: Beginner | Intermediate | Advanced)
exports.explainConcept = async (req, res) => {
  try {
    const { question, level = "Beginner" } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ success: false, message: "question is required" });
    }

    const prompt = `You are a friendly, encouraging programming tutor on an online learning platform.
Explain the following concept to a student whose level is: ${level}.

Question: "${question}"

Keep the explanation clear and appropriately scoped for a ${level} learner. Use a short example where helpful. Respond in plain text (no JSON).`;

    let answer;
    try {
      answer = await require("../utils/geminiClient").callGemini(prompt, { temperature: 0.6 });
    } catch (aiError) {
      console.error("Gemini explainConcept failed:", aiError.message);
      return res.status(502).json({
        success: false,
        message: "Could not fetch an explanation right now, please try again shortly",
        error: aiError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Explanation generated successfully",
      data: { answer },
    });
  } catch (error) {
    console.error("explainConcept error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ********************************************************************************************************
//                     Quiz Generator: turn arbitrary pasted notes/text into a quiz
// ********************************************************************************************************
// POST /api/v1/quiz/generate-from-text   body: { notes, numQuestions? }
// This does NOT persist to the Quiz collection (no subSection to key it against) — it's a
// stateless "paste notes -> get a quiz" tool.
exports.generateQuizFromText = async (req, res) => {
  try {
    const { notes, numQuestions = 5 } = req.body;

    if (!notes || !notes.trim()) {
      return res.status(400).json({ success: false, message: "notes text is required" });
    }

    const prompt = `You are an instructional designer. A student pasted the following notes/article/topic summary:

"""
${notes}
"""

Generate exactly ${numQuestions} multiple-choice questions that test understanding of this material. Each question must have exactly 4 answer options, only one of which is correct.

Respond ONLY with valid JSON matching this exact shape, and nothing else:
{
  "questions": [
    {
      "questionText": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswerIndex": 0,
      "explanation": "one sentence explaining why the answer is correct"
    }
  ]
}`;

    let generated;
    try {
      generated = await callGeminiJSON(prompt);
    } catch (aiError) {
      console.error("Gemini generateQuizFromText failed:", aiError.message);
      return res.status(502).json({
        success: false,
        message: "Could not generate quiz right now, please try again shortly",
        error: aiError.message,
      });
    }

    const questions = Array.isArray(generated?.questions) ? generated.questions : [];
    if (!questions.length) {
      return res.status(502).json({
        success: false,
        message: "AI did not return any quiz questions, please try again",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quiz generated successfully",
      data: { questions },
    });
  } catch (error) {
    console.error("generateQuizFromText error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ********************************************************************************************************
//              Learning Path Generator: goal + known skills -> a generated roadmap
// ********************************************************************************************************
// POST /api/v1/quiz/generate-learning-path   body: { goal, knownSkills? }
// This is separate from getLearningPathRecommendations (which uses real activity data for
// logged-in students) — this one is a free-form "tell me your goal" tool available to anyone.
exports.generateLearningPathFromGoal = async (req, res) => {
  try {
    const { goal, knownSkills = "" } = req.body;

    if (!goal || !goal.trim()) {
      return res.status(400).json({ success: false, message: "goal is required" });
    }

    const prompt = `You are a career/learning advisor for an online learning platform.

Student's goal: "${goal}"
What they already know: "${knownSkills || "Nothing specified"}"

Create a step-by-step learning roadmap to help them reach their goal. Respond ONLY with valid JSON matching this exact shape, and nothing else:
{
  "summary": "2-3 sentence overview of the recommended path",
  "steps": [
    {
      "title": "short step title",
      "description": "1-2 sentences on what to learn/do in this step",
      "estimatedTime": "e.g. '1-2 weeks'"
    }
  ]
}
Include at most 7 steps, ordered from first to last.`;

    let result;
    try {
      result = await callGeminiJSON(prompt);
    } catch (aiError) {
      console.error("Gemini generateLearningPathFromGoal failed:", aiError.message);
      return res.status(502).json({
        success: false,
        message: "Could not generate a learning path right now, please try again shortly",
        error: aiError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Learning path generated successfully",
      data: result,
    });
  } catch (error) {
    console.error("generateLearningPathFromGoal error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// GET /api/v1/quiz/recommendations?courseId=<id>   (courseId optional -> across all enrolled courses)
exports.getLearningPathRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.query;

    const progressFilter = { userId };
    if (courseId) progressFilter.courseID = courseId;

    const [progressDocs, attempts] = await Promise.all([
      CourseProgress.find(progressFilter).populate({
        path: "courseID",
        select: "courseName courseDescription courseContent",
        populate: { path: "courseContent", populate: { path: "subSection" } },
      }),
      QuizAttempt.find(courseId ? { user: userId, course: courseId } : { user: userId })
        .populate("subSection", "title")
        .sort({ createdAt: -1 })
        .limit(25),
    ]);

    if (!progressDocs.length && !attempts.length) {
      return res.status(200).json({
        success: true,
        message: "Not enough activity yet to generate recommendations",
        data: {
          summary:
            "Start watching lectures and taking the auto-generated quizzes — once you have some activity we'll tailor a learning path for you.",
          recommendations: [],
        },
      });
    }

    // Build a compact activity summary for the prompt instead of dumping raw DB docs
    const courseSummaries = progressDocs.map((p) => {
      const course = p.courseID;
      const totalLectures =
        course?.courseContent?.reduce((sum, sec) => sum + (sec.subSection?.length || 0), 0) || 0;
      return {
        courseName: course?.courseName || "Unknown course",
        completedLectures: p.completedVideos?.length || 0,
        totalLectures,
      };
    });

    const quizSummaries = attempts.map((a) => ({
      lecture: a.subSection?.title || "Unknown lecture",
      score: a.score,
      totalQuestions: a.totalQuestions,
      percentage: Math.round((a.score / a.totalQuestions) * 100),
    }));

    const prompt = `You are an academic advisor for an online learning platform. Based on this student's activity, recommend a personalized learning path.

Course progress:
${JSON.stringify(courseSummaries, null, 2)}

Recent quiz results (lower percentage = weaker understanding of that lecture's topic):
${JSON.stringify(quizSummaries, null, 2)}

Respond ONLY with valid JSON matching this exact shape, and nothing else:
{
  "summary": "2-3 sentence overview of how the student is doing",
  "recommendations": [
    {
      "title": "short recommendation title",
      "reason": "one sentence on why, referencing their actual progress or quiz scores",
      "priority": "high" | "medium" | "low"
    }
  ]
}
Include at most 5 recommendations, ordered by priority (high first).`;

    let result;
    try {
      result = await callGeminiJSON(prompt);
    } catch (aiError) {
      console.error("Gemini recommendation generation failed:", aiError.message);
      return res.status(502).json({
        success: false,
        message: "Could not generate recommendations right now, please try again shortly",
        error: aiError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recommendations generated successfully",
      data: result,
    });
  } catch (error) {
    console.error("getLearningPathRecommendations error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
