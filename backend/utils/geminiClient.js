// utils/geminiClient.js
// Thin wrapper around Google's Gemini API (generateContent) using the
// native fetch available in Node 18+. Keeping this in one place means
// every feature that needs the LLM (quiz generation, learning-path
// recommendations, etc.) talks to Gemini the same way.

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * Calls Gemini and returns the raw text of the first candidate.
 * @param {string} prompt - the full prompt to send
 * @param {object} [options]
 * @param {boolean} [options.jsonMode] - ask Gemini to only return JSON
 * @param {number} [options.temperature]
 */
async function callGemini(prompt, options = {}) {
  const { jsonMode = false, temperature = 0.7 } = options;

  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not set. Add it to backend/.env to enable AI features."
    );
  }

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature,
      ...(jsonMode ? { responseMimeType: "application/json" } : {}),
    },
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();

  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";

  if (!text) {
    throw new Error("Gemini API returned an empty response");
  }

  return text;
}

/**
 * Calls Gemini in JSON mode and parses the result. Strips markdown code
 * fences defensively in case the model wraps the JSON anyway.
 */
async function callGeminiJSON(prompt, options = {}) {
  const raw = await callGemini(prompt, { ...options, jsonMode: true });
  const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`Failed to parse Gemini JSON response: ${err.message}`);
  }
}

module.exports = { callGemini, callGeminiJSON };
