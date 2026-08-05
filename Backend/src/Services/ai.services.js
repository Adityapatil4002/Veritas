const { GoogleGenAI, Behavior } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

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

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    // const prompt = `Generate an interview report for a candidate with the following details:
    // Resume: ${resume}
    // Self Description: ${selfDescription}
  // Job Description: ${jobDescription}`
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
        //responseSchema: zodToJsonSchema(interviewReportSchema),
      },
    });
  console.log("RAW RESPONSE:");
  console.log(response.text);
    return JSON.parse(response.text)

    
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({
    format: 'A4', margin: {
      top: '20mm',
      bottom: '20mm',
      left: '20mm',
      right: '20mm'
  } });
  await browser.close();
  return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z.string().describe("The HTML content of the resume which can be converted to pdf using any library like puppeteer")
  })

  const prompt = `Generate a resume for candidate with the following details: 
                  Resume: ${resume}
                  Self Description: ${selfDescription}
                  job Descrition: ${jobDescription}
  
  the response should be in JSON object with a single field 'html' which contains the HTML content of the resume which can be converted to PDF using any libraries like puppeteer.
  The resume should be tailored for the given job decription and should highlight the candidate's skills and experience that are relevant to the job. The resume should be well formatted and should be easy to read. The resume should be in a professional format and should be suitable for submission to potential employers.
  The content of the resume should be not sound like it's generated by AI and should be as clase as possible to a real human-written resume.
  you can highlight the content using some colors or different font styles but the overall design should be professional and suitable for submission to potential employers.
  The content sohuld be ATS friendly and should be optimized for ATS systems. The content should be tailored for the given job description and should highlight the candidate's skills and experience that are relevant to the job. The content should be well formatted and should be easy to read. The content should be in a professional format and should be suitable for submission to potential employers.
  The resume should not be so lengthy, it should be ideally 1-2 pages long and should be concise and to the point. The resume should be in a professional format and should be suitable for submission to potential employers.`

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    }
  })

  const jsonContent = JSON.parse(response.text)

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

  return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }