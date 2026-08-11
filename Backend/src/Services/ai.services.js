const { GoogleGenAI, Behavior } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
  matchScore: z.number().describe("The match score between 0 to 100 indicating how well the candidate's profile matches the job describe?"),
  technicalQuestions: z.array(
    z.object({
      question: z
        .string()
        .describe("The technical question can be asked in the interview"),
      intention: z
        .string()
        .describe(
          "The intention of interviewer behind asking this question",
        ),
      answer: z
        .string()
        .describe(
          "How to answer this question, what points to cover, what is the approach ",
        ),
    }),
  ).describe("Technical Uestions that can be asked int he interview along with thier intention ans how to answer them"),
  behaviouralQuestions: z.array(
    z.object({
      question: z
        .string()
        .describe("The technical question can be asked in the interview"),
      intention: z
        .string()
        .describe(
          "The intention of interviewer behind asking this question",
        ),
      answer: z
        .string()
        .describe(
          "How to answer this question, what points to cover, what is the approach ",
        ),
    }),
    ).describe("Behavioural Uestions that can be asked int he interview along with thier intention ans how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e explain the severit of this skill gap and also explain the candidate what skills they are lacking and what exactly they should do")
    })).describe("List of skill gaps in the candidate's profile along with thei severity "),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in th preparation plan, start from day 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g data structure, system design, full stack development, etc"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g practice leetcode pattern wise question with their patterns, read system design articles and case studies, etc")

    })).describe("A day wise preparation plan for the candidate to prepare for the interview, with focus and tasks for each day"),
    title: z.string().describe("The title of the job which the interview report is generated "),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an expert technical interviewer.

Analyze the candidate and return ONLY valid JSON.

Return exactly this structure:

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behaviouralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": [string]
    }
  ]
}

Requirements:
- matchScore should be between 0 and 100.
- Generate 10 technical questions.
- Generate 5 behavioural questions.
- Generate at least 5 skill gaps.
- Generate a 14 day preparation plan.
- Return ONLY JSON.
- Do not include markdown.
- Do not include explanation outside JSON.

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
      // Pro-tip: Uncommenting this forces the API to strictly adhere to your structure,
      // which prevents malformed JSON at the API level!
      // responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  console.log("RAW RESPONSE:");
  console.log(response.text);

  // --- SANITIZATION LOGIC ---
  let rawText = response.text;

  // 1. Strip out markdown blocks (e.g., ```json ... ```) if the model included them
  rawText = rawText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // 2. Isolate the main JSON object by finding the first '{' and last '}'
  const firstBrace = rawText.indexOf("{");
  const lastBrace = rawText.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    rawText = rawText.substring(firstBrace, lastBrace + 1);
  } else {
    throw new Error(
      "Failed to extract valid JSON boundaries from AI response.",
    );
  }

  // 3. Safely parse the clean string
  return JSON.parse(rawText);
}



async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const prompt = `
You are an expert resume writer and ATS optimization specialist. 
Based on the candidate's existing resume, self-description, and the target job description, generate a highly optimized resume data structure.

Return ONLY valid JSON.

Return exactly this structure:
{
  "personalInfo": {
    "name": string,
    "email": string,
    "phone": string,
    "location": string
  },
  "summary": string,
  "skills": [string],
  "experience": [
    {
      "company": string,
      "role": string,
      "duration": string,
      "highlights": [string]
    }
  ],
  "education": [
    {
      "institution": string,
      "degree": string,
      "year": string
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

  // Sanitization logic for safety
  let rawText = response.text;
  rawText = rawText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = rawText.indexOf("{");
  const lastBrace = rawText.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    rawText = rawText.substring(firstBrace, lastBrace + 1);
  } else {
    throw new Error(
      "Failed to extract valid JSON boundaries from AI response.",
    );
  }

  return JSON.parse(rawText);
}

module.exports = { generateInterviewReport, generateResumePdf }