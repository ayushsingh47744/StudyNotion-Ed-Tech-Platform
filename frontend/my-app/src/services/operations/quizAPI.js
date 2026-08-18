import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { quizEndpoints } from "../apis";

const { GENERATE_QUIZ_API, SUBMIT_QUIZ_API, GET_RECOMMENDATIONS_API } = quizEndpoints;

// Generate (or fetch cached) AI quiz for a lecture
export const generateQuiz = async (subSectionId, courseId, token, regenerate = false) => {
  const toastId = toast.loading("Generating quiz with AI...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GENERATE_QUIZ_API,
      { subSectionId, courseId, regenerate },
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not generate quiz");
    }

    result = response.data.data;
  } catch (error) {
    console.log("GENERATE QUIZ API ERROR....", error);
    toast.error(error?.response?.data?.message || error.message || "Could not generate quiz");
  }
  toast.dismiss(toastId);
  return result;
};

// Submit answers for a quiz attempt
export const submitQuizAttempt = async (quizId, subSectionId, courseId, answers, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      SUBMIT_QUIZ_API,
      { quizId, subSectionId, courseId, answers },
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not submit quiz");
    }

    result = response.data.data;
  } catch (error) {
    console.log("SUBMIT QUIZ API ERROR....", error);
    toast.error(error?.response?.data?.message || error.message || "Could not submit quiz");
  }
  return result;
};

// Get personalized learning-path recommendations (optionally scoped to a course)
export const getLearningPathRecommendations = async (token, courseId) => {
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      courseId ? `${GET_RECOMMENDATIONS_API}?courseId=${courseId}` : GET_RECOMMENDATIONS_API,
      null,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch recommendations");
    }

    result = response.data.data;
  } catch (error) {
    console.log("GET RECOMMENDATIONS API ERROR....", error);
  }
  return result;
};
