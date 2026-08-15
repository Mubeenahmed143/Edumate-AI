const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/career", async (req, res) => {
  try {
    const {
      education,
      skills,
      interests,
      goal,
    } = req.body;

    if (
      !education?.trim() ||
      !skills?.trim() ||
      !interests?.trim() ||
      !goal?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all career details.",
      });
    }

    const prompt = `
You are EduMate AI, an expert educational and career mentor.

Analyze the student's information and create a personalized career roadmap.

Student Information:

Education:
${education}

Skills:
${skills}

Interests:
${interests}

Career Goal:
${goal}

Return ONLY valid JSON.
Do not use markdown.
Do not use code fences.
Do not add any explanation outside the JSON.

Use exactly this structure:

{
  "careerTitle": "Recommended career title",
  "match": 85,
  "description": "Short explanation of why this career matches the student.",
  "skillsToLearn": [
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4",
    "Skill 5",
    "Skill 6"
  ],
  "roadmap": [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5"
  ],
  "jobRoles": [
    "Job Role 1",
    "Job Role 2",
    "Job Role 3"
  ],
  "nextSteps": [
    "Next action 1",
    "Next action 2",
    "Next action 3"
  ]
}

Rules:
- match must be a number between 0 and 100.
- Recommend a realistic career based on the student's actual information.
- Do not blindly recommend AI just because EduMate AI is an AI application.
- Skills should be relevant to the recommended career.
- Roadmap should progress from beginner to job-ready level.
- Keep explanations simple and student-friendly.
- Do not invent degrees or experience that the student did not provide.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    let result = response.text.trim();

    result = result
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const careerData = JSON.parse(result);

    if (
      !careerData.careerTitle ||
      !careerData.skillsToLearn ||
      !careerData.roadmap
    ) {
      throw new Error("Invalid career data received from AI.");
    }

    res.json({
      success: true,
      career: careerData,
    });
  } catch (error) {
    console.error("Career AI Error:", error);

    res.status(500).json({
      success: false,
      message: "AI career analysis could not be generated.",
    });
  }
});

module.exports = router;