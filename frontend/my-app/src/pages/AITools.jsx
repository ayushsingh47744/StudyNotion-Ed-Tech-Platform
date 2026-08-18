import { useState } from "react";
import { AiOutlineRobot, AiOutlineQuestionCircle } from "react-icons/ai";
import { BsSignpost2 } from "react-icons/bs";

import {
  explainConcept,
  generateQuizFromText,
  generateLearningPathFromGoal,
} from "../services/operations/aiToolsAPI";

const TABS = [
  { key: "tutor", label: "AI Tutor", icon: AiOutlineRobot },
  { key: "quiz", label: "Quiz Generator", icon: AiOutlineQuestionCircle },
  { key: "path", label: "Learning Path", icon: BsSignpost2 },
];

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

function TabButton({ tab, active, onClick }) {
  const Icon = tab.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-medium transition-colors duration-150 ${
        active
          ? "border-yellow-25 text-yellow-25"
          : "border-transparent text-richblack-300 hover:text-richblack-100"
      }`}
    >
      <Icon className="text-base" />
      {tab.label}
    </button>
  );
}

function AITutorPanel() {
  const [level, setLevel] = useState("Beginner");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setAnswer("");
    const res = await explainConcept(question, level);
    if (res) setAnswer(res.answer);
    setLoading(false);
  };

  return (
    <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-richblack-100">Explain like I'm a:</span>
        <div className="flex gap-2">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
                level === lvl
                  ? "bg-yellow-25 text-richblack-900"
                  : "bg-richblack-700 text-richblack-100 hover:bg-richblack-600"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Ask about any concept, e.g. 'What is a closure in JS?'"
          className="form-style w-full"
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="shrink-0 rounded-md bg-yellow-25 px-6 py-2 font-semibold text-richblack-900 disabled:opacity-60"
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </div>

      {answer && (
        <div className="mt-6 whitespace-pre-line rounded-md border border-richblack-600 bg-richblack-900 p-4 text-sm leading-relaxed text-richblack-25">
          {answer}
        </div>
      )}
    </div>
  );
}

function QuizGeneratorPanel() {
  const [notes, setNotes] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!notes.trim() || loading) return;
    setLoading(true);
    setQuiz(null);
    setSubmitted(false);
    const res = await generateQuizFromText(notes);
    if (res?.questions?.length) {
      setQuiz(res.questions);
      setAnswers(Array(res.questions.length).fill(-1));
    }
    setLoading(false);
  };

  const selectAnswer = (qIdx, oIdx) => {
    if (submitted) return;
    const updated = [...answers];
    updated[qIdx] = oIdx;
    setAnswers(updated);
  };

  const score = quiz
    ? quiz.reduce((acc, q, i) => acc + (answers[i] === q.correctAnswerIndex ? 1 : 0), 0)
    : 0;

  return (
    <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
      <p className="text-sm text-richblack-200">
        Paste any notes, an article, or a topic summary. The AI will turn it into a 5-question
        quiz.
      </p>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Paste your notes here..."
        rows={7}
        className="form-style mt-4 w-full resize-y"
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !notes.trim()}
        className="mt-4 rounded-md bg-yellow-25 px-6 py-2 font-semibold text-richblack-900 disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {quiz && (
        <div className="mt-8 flex flex-col gap-y-6">
          {submitted && (
            <div className="rounded-md border border-yellow-400 bg-richblack-700 p-4 text-center text-richblack-5">
              You scored {score} / {quiz.length}
            </div>
          )}
          {quiz.map((q, qIdx) => (
            <div key={qIdx} className="flex flex-col gap-y-2">
              <p className="font-medium text-richblack-5">
                {qIdx + 1}. {q.questionText}
              </p>
              <div className="flex flex-col gap-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = answers[qIdx] === oIdx;
                  const isCorrect = submitted && oIdx === q.correctAnswerIndex;
                  const isWrong = submitted && isSelected && oIdx !== q.correctAnswerIndex;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => selectAnswer(qIdx, oIdx)}
                      className={`rounded-md border px-4 py-2 text-left text-sm ${
                        isCorrect
                          ? "border-caribbeangreen-300 bg-caribbeangreen-900 text-caribbeangreen-100"
                          : isWrong
                          ? "border-pink-300 bg-pink-900 text-pink-100"
                          : isSelected
                          ? "border-yellow-400 bg-richblack-700 text-richblack-5"
                          : "border-richblack-600 bg-richblack-900 text-richblack-100 hover:border-richblack-400"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && q.explanation && (
                <p className="text-xs text-richblack-300">
                  <span className="font-semibold text-richblack-100">Why: </span>
                  {q.explanation}
                </p>
              )}
            </div>
          ))}
          {!submitted && (
            <button
              onClick={() => setSubmitted(true)}
              disabled={answers.includes(-1)}
              className="self-start rounded-md bg-yellow-25 px-6 py-2 font-semibold text-richblack-900 disabled:opacity-60"
            >
              Submit Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function LearningPathPanel() {
  const [goal, setGoal] = useState("");
  const [knownSkills, setKnownSkills] = useState("");
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!goal.trim() || loading) return;
    setLoading(true);
    setPath(null);
    const res = await generateLearningPathFromGoal(goal, knownSkills);
    if (res) setPath(res);
    setLoading(false);
  };

  return (
    <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
      <label className="text-sm text-richblack-200">Your goal</label>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="e.g. Become a full-stack MERN developer"
        className="form-style mt-2 w-full"
      />

      <label className="mt-5 block text-sm text-richblack-200">
        What you already know (optional)
      </label>
      <input
        type="text"
        value={knownSkills}
        onChange={(e) => setKnownSkills(e.target.value)}
        placeholder="e.g. HTML, CSS, basic JavaScript"
        className="form-style mt-2 w-full"
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !goal.trim()}
        className="mt-5 rounded-md bg-yellow-25 px-6 py-2 font-semibold text-richblack-900 disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate Learning Path"}
      </button>

      {path && (
        <div className="mt-8">
          <p className="text-sm text-richblack-200">{path.summary}</p>
          <div className="mt-4 flex flex-col gap-y-3">
            {path.steps?.map((step, idx) => (
              <div
                key={idx}
                className="flex gap-x-4 rounded-md border border-richblack-600 bg-richblack-900 p-4"
              >
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-yellow-25 text-sm font-bold text-richblack-900">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-medium text-richblack-5">{step.title}</p>
                  <p className="mt-1 text-sm text-richblack-300">{step.description}</p>
                  {step.estimatedTime && (
                    <p className="mt-1 text-xs text-richblack-400">⏱ {step.estimatedTime}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AITools() {
  const [activeTab, setActiveTab] = useState("tutor");

  return (
    <div className="mx-auto w-11/12 max-w-maxContent py-10 text-richblack-5">
      <h1 className="text-3xl font-semibold">AI Learning Tools</h1>
      <p className="mt-2 text-richblack-300">
        Get instant explanations, practice quizzes, and a personalized roadmap — powered by AI.
      </p>

      <div className="mt-6 flex gap-x-8 border-b border-richblack-700">
        {TABS.map((tab) => (
          <TabButton
            key={tab.key}
            tab={tab}
            active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "tutor" && <AITutorPanel />}
        {activeTab === "quiz" && <QuizGeneratorPanel />}
        {activeTab === "path" && <LearningPathPanel />}
      </div>
    </div>
  );
}
