import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/**
 * @description generate a new interview report on the basis of user self desciption, resume pdf and job description
 */
// FIX 1: Added 'async' keyword here
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  // FIX 2: Corrected spelling from 'reposnse' to 'response'
  const response = await api.post("/api/interview", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * @description get the interview report on the basis of interviewId
 */
export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);
  return response.data;
};

/**
 * @description get all the interview reports of the user
 */
export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview/");
  return response.data;
};

/**
 * @description generate a pdf of the resume on the basis of self description, resume content and job decritpion
 */
export const generateResumePdf = async (interviewReportId) => {
  // FIX: Removed the blob responseType since the backend now sends JSON
  const response = await api.post(
    `/api/interview/resume/pdf/${interviewReportId}`,
  );
  return response.data;
};
