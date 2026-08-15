const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/quiz", async (req, res) => {
  try {
    const { topic, questionCount, difficulty } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({
        success: false,
        message: "Quiz topic is required.",
      });
    }

    const count = Number(questionCount) || 5;

    const prompt = `
You are EduMate AI, an educational quiz generator.

Create exactly ${count} multiple-choice questions about:

Topic: ${topic}

Difficulty: ${difficulty}

Return ONLY valid JSON.
Do not use markdown.
Do not use code fences.
Do not add any explanation before or after the JSON.

The JSON must have exactly this structure:

{
  "questions": [
    {
      "question": "Question text",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "answer": "The exact correct option text"
    }
  ]
}

Rules:
- Exactly ${count} questions.
- Every question must have exactly 4 options.
- Only one option should be correct.
- The "answer" must exactly match one of the four options.
- Questions should be educational and relevant to the topic.
- Keep the language simple and student-friendly.
- Match the requested difficulty: ${difficulty}.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    let result = response.text.trim();

    // Remove markdown code fences if Gemini adds them
    result = result
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const quizData = JSON.parse(result);

    if (
      !quizData.questions ||
      !Array.isArray(quizData.questions) ||
      quizData.questions.length === 0
    ) {
      throw new Error("Invalid quiz data received from AI.");
    }

    res.json({
      success: true,
      questions: quizData.questions,
    });
  } catch (error) {
    console.error("Quiz AI Error:", error);

    res.status(500).json({
      success: false,
      message: "AI quiz could not be generated.",
    });
  }
});

module.exports = router;
