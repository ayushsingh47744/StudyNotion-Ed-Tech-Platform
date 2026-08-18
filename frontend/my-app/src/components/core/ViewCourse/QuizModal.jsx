import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { submitQuizAttempt } from "../../../services/operations/quizAPI";
import IconBtn from "../../common/IconBtn";

export default function QuizModal({ quiz, subSectionId, courseId, setQuizModal }) {
  const { token } = useSelector((state) => state.auth);

  const [answers, setAnswers] = useState(Array(quiz.questions.length).fill(-1));
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelect = (questionIdx, optionIdx) => {
    if (result) return; // lock answers after submitting
    const updated = [...answers];
    updated[questionIdx] = optionIdx;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.includes(-1)) {
      toast.error("Please answer every question before submitting");
      return;
    }
    setSubmitting(true);
    const res = await submitQuizAttempt(quiz._id, subSectionId, courseId, answers, token);
    if (res) {
      setResult(res);
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {result ? "Quiz Results" : "Quick Quiz"}
          </p>
          <button onClick={() => setQuizModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <div className="flex flex-col gap-y-6 p-6">
          {result && (
            <div className="rounded-md border border-yellow-400 bg-richblack-700 p-4 text-center">
              <p className="text-lg font-semibold text-richblack-5">
                You scored {result.score} / {result.totalQuestions}
              </p>
              <p className="text-sm text-richblack-300">
                {result.score === result.totalQuestions
                  ? "Perfect score! 🎉"
                  : "Review the explanations below to strengthen weak spots."}
              </p>
            </div>
          )}

          {quiz.questions.map((q, qIdx) => (
            <div key={qIdx} className="flex flex-col gap-y-3">
              <p className="font-medium text-richblack-5">
                {qIdx + 1}. {q.questionText}
              </p>
              <div className="flex flex-col gap-y-2">
                {q.options.map((option, oIdx) => {
                  const isSelected = answers[qIdx] === oIdx;
                  const isCorrect = result && oIdx === q.correctAnswerIndex;
                  const isWrongSelected = result && isSelected && oIdx !== q.correctAnswerIndex;

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={!!result}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      className={`flex items-center gap-x-3 rounded-md border px-4 py-2 text-left text-sm transition-colors
                        ${
                          isCorrect
                            ? "border-caribbeangreen-300 bg-caribbeangreen-900 text-caribbeangreen-100"
                            : isWrongSelected
                            ? "border-pink-300 bg-pink-900 text-pink-100"
                            : isSelected
                            ? "border-yellow-400 bg-richblack-700 text-richblack-5"
                            : "border-richblack-600 bg-richblack-800 text-richblack-100 hover:border-richblack-400"
                        }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {result && q.explanation && (
                <p className="text-xs text-richblack-300">
                  <span className="font-semibold text-richblack-100">Why: </span>
                  {q.explanation}
                </p>
              )}
            </div>
          ))}

          <div className="mt-2 flex justify-end gap-x-3">
            <button
              type="button"
              onClick={() => setQuizModal(false)}
              className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
            >
              Close
            </button>
            {!result && (
              <IconBtn
                text={submitting ? "Submitting..." : "Submit Quiz"}
                disabled={submitting}
                onClick={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
