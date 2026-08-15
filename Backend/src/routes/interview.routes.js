const express = require("express");
const { requireAuth } = require("@clerk/express");
const interviewController = require("../Controller/interview.controller");
const upload = require("../Middlewares/file.middleware");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description Generate a new interview report
 * @access private
 */
interviewRouter.post(
  "/",
  requireAuth(),
  upload.single("resume"),
  interviewController.generateInterviewReportController,
);

/**
 * @route GET /api/interview/report/:interviewId
 * @description Get interview report by ID
 * @access private
 */
interviewRouter.get(
  "/report/:interviewId",
  requireAuth(),
  interviewController.getInterviewReportByIdController,
);

/**
 * @route GET /api/interview/
 * @description Get all interview reports of the logged-in user
 * @access private
 */
interviewRouter.get(
  "/",
  requireAuth(),
  interviewController.getAllInterviewReportsController,
);

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description Generate resume PDF
 * @access private
 */
interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  requireAuth(),
  interviewController.generateResumePdfController,
);

module.exports = interviewRouter;
