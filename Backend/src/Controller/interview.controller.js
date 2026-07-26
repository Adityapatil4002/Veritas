const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../Services/ai.services");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const resumeContent = pdfData.text;

    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription,
      
    });
    console.log("AI RESPONSE:", JSON.stringify(interviewReportByAi, null, 2));

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate interview report",
      error: error.message,
    });
  }
}

module.exports = { generateInterviewReportController };
