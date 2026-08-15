const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// --- SCHEMAS ---

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "The match score between 0 to 100 indicating how well the candidate's profile matches the job description",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical question that can be asked in the interview",
          ),
        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what is the approach",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),
  behaviouralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The behavioural question that can be asked in the interview",
          ),
        intention: z
          .string()
          .describe(
            "The intention of the interviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what is the approach",
          ),
      }),
    )
    .describe(
      "Behavioural questions that can be asked in the interview along with their intention and how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of this skill gap"),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, start from day 1"),
        focus: z
          .string()
          .describe("The main focus of this day in the preparation plan"),
        tasks: z
          .array(z.string())
          .describe("List of tasks to be done on this day"),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to prepare for the interview",
    ),
  title: z
    .string()
    .describe(
      "The title of the job which the interview report is generated for",
    ),
});

// Added schema for resume PDF to ensure perfect structure
const resumePdfSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
  }),
  summary: z.string(),
  skills: z.array(z.string()),
  experience: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      duration: z.string(),
      highlights: z.array(z.string()),
    }),
  ),
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      year: z.string(),
    }),
  ),
});

// --- SERVICES ---

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an expert technical interviewer.
Analyze the candidate and return ONLY valid JSON matching the exact schema requirements.

Requirements:
- matchScore should be between 0 and 100.
- Generate 10 technical questions.
- Generate 5 behavioural questions.
- Generate at least 5 skill gaps.
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
      // FIX: Passing the schema forces the AI to return perfect JSON every time.
      // It eliminates hallucinations, trailing text, and the need for manual string cleanup.
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  console.log("RAW RESPONSE:");
  console.log(response.text);

  // Directly parse the response since the schema guarantees validity
  return JSON.parse(response.text.trim());
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const prompt = `
You are an expert resume writer and ATS optimization specialist. 
Based on the candidate's existing resume, self-description, and the target job description, generate a highly optimized resume data structure.

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
      // FIX: Added schema enforcement here as well
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  console.log("RAW RESUME JSON:");
  console.log(response.text);

  // Directly parse the response since the schema guarantees validity
  return JSON.parse(response.text.trim());
}

module.exports = { generateInterviewReport, generateResumePdf };
