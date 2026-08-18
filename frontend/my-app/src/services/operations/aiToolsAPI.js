import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { aiToolsEndpoints } from "../apis";

const { EXPLAIN_CONCEPT_API, GENERATE_QUIZ_FROM_TEXT_API, GENERATE_LEARNING_PATH_API } =
  aiToolsEndpoints;

// AI Tutor: ask any concept question
export const explainConcept = async (question, level) => {
  let result = null;
  try {
    const response = await apiConnector("POST", EXPLAIN_CONCEPT_API, { question, level });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch explanation");
    }
    result = response.data.data;
  } catch (error) {
    console.log("EXPLAIN CONCEPT API ERROR....", error);
    toast.error(error?.response?.data?.message || error.message || "Could not fetch explanation");
  }
  return result;
};

// Quiz Generator: turn pasted notes into a quiz
export const generateQuizFromText = async (notes) => {
  let result = null;
  try {
    const response = await apiConnector("POST", GENERATE_QUIZ_FROM_TEXT_API, { notes });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not generate quiz");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GENERATE QUIZ FROM TEXT API ERROR....", error);
    toast.error(error?.response?.data?.message || error.message || "Could not generate quiz");
  }
  return result;
};

// Learning Path: goal + known skills -> roadmap
export const generateLearningPathFromGoal = async (goal, knownSkills) => {
  let result = null;
  try {
    const response = await apiConnector("POST", GENERATE_LEARNING_PATH_API, {
      goal,
      knownSkills,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not generate learning path");
    }
    result = response.data.data;
  } catch (error) {
    console.log("GENERATE LEARNING PATH API ERROR....", error);
    toast.error(
      error?.response?.data?.message || error.message || "Could not generate learning path"
    );
  }
  return result;
};
