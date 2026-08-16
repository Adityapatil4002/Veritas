const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../Services/ai.services");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * BULLETPROOF AUTH HELPER
 * If Clerk's middleware fails to populate req.auth.userId, this manually
 * decodes the token from the headers to guarantee we get the User ID.
 */
const getUserId = (req) => {
  if (req.auth && req.auth.userId) return req.auth.userId;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(
        Buffer.from(base64, "base64").toString("utf-8"),
      );
      return payload.sub; // Clerk stores the user ID in the 'sub' claim
    } catch (err) {
      console.error("Failed to decode fallback token:", err);
      return null;
    }
  }
  return null;
};

/**
 * @description generate a new interview report on the basis of user self desciption, resume pdf and job description
 */
async function generateInterviewReportController(req, res) {
  try {
    // 1. Extract User ID FIRST before doing any heavy processing
    const userId = getUserId(req);
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

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

    console.log("AI RESPONSE GENERATED SUCCESSFULLY");

    const interviewReport = await interviewReportModel.create({
      // Spread AI response first
      ...interviewReportByAi,

      // Enforce backend variables
      user: userId,
      title: "Untitled Interview Plan",
      resume: resumeContent,
      selfDescription,
      jobDescription,
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
  const userId = getUserId(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: userId,
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
  const userId = getUserId(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const interviewReports = await interviewReportModel
    .find({ user: userId })
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
 * @description generate a new resume data object
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

    const resumeData = await generateResumePdf({
      resume,
      jobDescription,
      selfDescription,
    });

    res.status(200).json({
      message: "Resume data generated successfully",
      resumeData,
    });
  } catch (error) {
    console.error("Resume Data Generation Error:", error);
    res.status(500).json({
      message: "Failed to generate resume data",
      error: error.message,
    });
  }
}

module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
};
