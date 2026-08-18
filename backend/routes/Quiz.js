const express = require("express");
const router = express.Router();

const {
  generateQuiz,
  submitQuizAttempt,
  getLearningPathRecommendations,
  explainConcept,
  generateQuizFromText,
  generateLearningPathFromGoal,
} = require("../controllers/Quiz");

const { auth, isStudent } = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Quiz routes (Gemini-powered)
// ********************************************************************************************************

// Generate (or fetch cached) AI quiz for a lecture/subsection
router.post("/generate", auth, isStudent, generateQuiz);

// Submit answers for a quiz attempt
router.post("/submit", auth, isStudent, submitQuizAttempt);

// Get personalized learning-path recommendations
router.get("/recommendations", auth, isStudent, getLearningPathRecommendations);

// ********************************************************************************************************
//               Public "AI Tools" page routes (no login required — matches /ai-tools page)
// ********************************************************************************************************

// AI Tutor: explain any concept on demand
router.post("/explain", explainConcept);

// Quiz Generator: turn pasted notes/text into a quiz (stateless, not tied to a lecture)
router.post("/generate-from-text", generateQuizFromText);

// Learning Path: goal + known skills -> a generated roadmap
router.post("/generate-learning-path", generateLearningPathFromGoal);

module.exports = router;
