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

    })).describe("A day wise preparation plan for the candidate to prepare for the interview, with focus and tasks for each day")
});


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for a candidate with the following details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}`



    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)

        }
    })
    return JSON.parse(response.text)

    
}

module.exports = invokeGeminiAi