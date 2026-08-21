const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// ======================================================
// POST /api/coding
// ======================================================

router.post("/coding", async (req, res) => {
  try {

    const {
      language,
      code,
      problem,
    } = req.body;


    // ---------------- VALIDATION ----------------

    if (!code || !code.trim()) {
      return res.status(400).json({
        success: false,
        message: "Code is required.",
      });
    }


    // ---------------- AI PROMPT ----------------

    const prompt = `
You are EduMate AI Coding Assistant.

You are an expert programming teacher who helps students
understand programming concepts, debug code and fix errors.

The student has provided the following information.

Programming Language:
${language || "JavaScript"}

Student Code:
\`\`\`${language || "text"}
${code}
\`\`\`

Student's Problem:
${problem || "No specific problem was provided. Analyze the code and explain any issues."}


Your task is to analyze the code carefully.

Return your answer using EXACTLY these sections:

PROBLEM:
Explain what is wrong with the code.
If there is no error, clearly say that the code looks correct.

EXPLANATION:
Explain the problem in simple beginner-friendly language.

SOLUTION:
Provide the corrected code.
If no correction is needed, show the improved version only if useful.

HOW IT WORKS:
Briefly explain how the corrected code works.

TIPS:
Give 2 or 3 useful programming tips related to this problem.


IMPORTANT RULES:

1. Be beginner-friendly.
2. Do not use unnecessarily complicated terminology.
3. Do not change the programming language.
4. Do not make unrelated changes to the student's code.
5. If the code is correct, do not invent an error.
6. If there are multiple errors, explain the important ones.
7. Always provide corrected code when a fix is needed.
8. Keep the answer practical and educational.
`;


    // ---------------- GEMINI REQUEST ----------------

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });


    const result = response.text;


    // ---------------- SEND RESPONSE ----------------

    return res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {

    console.error(
      "Coding Assistant Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message: "AI code analysis failed.",
      error: error.message,
    });

  }
});


module.exports = router;
