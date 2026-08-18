const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    options: {
      type: [String],
      required: true,
      validate: (v) => Array.isArray(v) && v.length >= 2,
    },
    correctAnswerIndex: { type: Number, required: true },
    explanation: { type: String, default: "" },
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    subSection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
      required: true,
      unique: true, // one generated quiz cached per lecture/subsection
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
    },
    generatedBy: {
      type: String,
      default: "gemini",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
