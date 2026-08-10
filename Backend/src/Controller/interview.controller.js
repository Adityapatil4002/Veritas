const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../Services/ai.services");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description generate a new interview report on the basis of user self desciption, resume pdf and job description
 */
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
      title: "Untitled Interview Plan", // FIX: Added a default title to satisfy the DB schema
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

/**
 * @description get the interview report on the basis of interviewId
 */
async function getInterviewReportByIdController(req, res) {
  const { interviewId } = req.params;

  // FIX: Used findOne instead of findById when passing an object query
  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found",
    });
  }
  res.status(200).json({
    message: "Interview report fetched successfully",
    interviewReport,
  });
}

/**
 * @description get all the interview reports of the user
 */
async function getAllInterviewReportsController(req, res) {
  // FIX: Await the entire query chain, not just the find() method
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGaps -preparationPlan",
    );

  res.status(200).json({
    message: "Interview reports fetched successfully",
    interviewReports,
  });
}

/**
 * @description generate a new interview report on the basis of user self desciption, resume pdf and job description
 */
async function generateResumePdfController(req, res) {
  try {
    const { interviewReportId } = req.params;

    const interviewReport =
      await interviewReportModel.findById(interviewReportId);

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found",
      });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
      resume,
      jobDescription,
      selfDescription,
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    // FIX: Added a try...catch block to properly log and handle upstream errors
    console.error("PDF Generation Error:", error);
    res.status(500).json({
      message: "Failed to generate resume PDF",
      error: error.message,
    });
  }
}

// FIX: Exported ALL controller functions
module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
};
