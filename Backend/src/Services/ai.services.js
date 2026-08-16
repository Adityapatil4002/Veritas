const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an expert technical interviewer.
Analyze the candidate and return ONLY valid JSON matching the exact schema requirements.

You MUST return exactly this JSON structure:
{
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "behaviouralQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "skillGaps": [
    {
      "skill": "string",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "string",
      "tasks": ["string"]
    }
  ],
  "title": "string"
}

Requirements:
- matchScore should be between 0 and 100.
- Generate 10 technical questions.
- Generate 5 behavioural questions.
- Generate at least 5 skill gaps.
- severity must be "low", "medium", or "high".
- Generate a 14 day preparation plan.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  console.log("RAW RESPONSE:");
  console.log(response.text);

  return JSON.parse(response.text.trim());
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const prompt = `
You are an expert resume writer and ATS optimization specialist. 
Based on the candidate's existing resume, self-description, and the target job description, generate a highly optimized resume data structure.

You MUST return exactly this JSON structure:
{
  "personalInfo": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "location": "string"
  },
  "summary": "string",
  "skills": ["string"],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string",
      "highlights": ["string"]
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "year": "string"
    }
  ]
}

Ensure the content highlights skills and experiences most relevant to the job description. Do not include markdown formatting or conversational text.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  console.log("RAW RESUME JSON:");
  console.log(response.text);

  return JSON.parse(response.text.trim());
}

module.exports = { generateInterviewReport, generateResumePdf };
