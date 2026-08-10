const express = require("express");
const authMiddleware = require("../Middlewares/auth.middleware");
const interviewController = require("../Controller/interview.controller");
const upload = require("../Middlewares/file.middleware");

const interviewRouter = express.Router();

/**
 * @route POST/api/interview/
 * @description generate a new interview report on the basis of user self desciption, resume pdf and job description
 * @access private
 */
interviewRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.generateInterviewReportController,
);

/**
 * @route GET/api/interview/report/:interviewId
 * @description get the interview report on the basis of interviewId
 * @access private
 */
// FIXED THIS LINE: Added "ById"
interviewRouter.get(
  "/report/:interviewId",
  authMiddleware.authUser,
  interviewController.getInterviewReportByIdController,
);

/**
 * @route GET/api/interview/
 * @description get all the interview reports of the user
 * @access private
 */
interviewRouter.get(
  "/",
  authMiddleware.authUser,
  interviewController.getAllInterviewReportsController,
);

/**
 * @route POST/api/interview/resume/pdf/:interviewReportId
 * @description generate a pdf of the resume on the basis of self description, resume content and job decritpion
 * @access private
 */
// FIXED THIS LINE: Added "interviewController." prefix
interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authMiddleware.authUser,
  interviewController.generateResumePdfController,
);

module.exports = interviewRouter;
