const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/notes", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "PDF text is required.",
      });
    }

    const prompt = `
You are EduMate AI, an educational assistant.

Create clear, easy-to-understand study notes from the following study material.

Return the response in exactly this format:

TITLE:
Write a suitable title.

SUMMARY:
Write a simple 1-2 paragraph summary.

IMPORTANT POINTS:
- Point 1
- Point 2
- Point 3
- Point 4
- Point 5

KEY CONCEPTS:
- Concept 1: short explanation
- Concept 2: short explanation
- Concept 3: short explanation

EXAM TIPS:
- Tip 1
- Tip 2
- Tip 3

Keep the language simple and student-friendly.
Focus only on the provided study material.

Study Material:
${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      notes: response.text,
    });
  } catch (error) {
    console.error("Notes AI Error:", error);

    res.status(500).json({
      success: false,
      message: "AI notes could not be generated.",
    });
  }
});

module.exports = router;