const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const prompt = `
You are EduMate AI, a helpful and friendly AI assistant designed for students.

Your job is to help students with:
- Education
- Programming
- Study questions
- Notes
- Exams
- Career guidance
- General academic topics

Give clear, simple and accurate answers.

If the student asks a programming question, explain the solution step-by-step and provide code when useful.

Student question:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: "AI response could not be generated.",
    });
  }
});

module.exports = router;