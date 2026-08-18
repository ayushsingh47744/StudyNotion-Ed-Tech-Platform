import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { VscSparkleFilled } from "react-icons/vsc";

import { getLearningPathRecommendations } from "../../../services/operations/quizAPI";

const priorityStyles = {
  high: "border-pink-300 bg-pink-900 text-pink-100",
  medium: "border-yellow-400 bg-richblack-700 text-yellow-100",
  low: "border-caribbeangreen-300 bg-caribbeangreen-900 text-caribbeangreen-100",
};

export default function LearningPathRecommendations() {
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getLearningPathRecommendations(token);
      setData(res);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="mb-8 rounded-lg border border-richblack-700 bg-richblack-800 p-5">
        <div className="h-4 w-48 animate-pulse rounded bg-richblack-700" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mb-8 rounded-lg border border-richblack-700 bg-richblack-800 p-5">
      <div className="flex items-center gap-x-2">
        <VscSparkleFilled className="text-xl text-yellow-50" />
        <p className="text-lg font-semibold text-richblack-5">
          Your Personalized Learning Path
        </p>
      </div>
      <p className="mt-2 text-sm text-richblack-300">{data.summary}</p>

      {data.recommendations?.length > 0 && (
        <div className="mt-4 flex flex-col gap-y-3">
          {data.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className={`rounded-md border px-4 py-3 text-sm ${
                priorityStyles[rec.priority] || priorityStyles.medium
              }`}
            >
              <p className="font-semibold">{rec.title}</p>
              <p className="mt-1 opacity-90">{rec.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
