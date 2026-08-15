import axios from "axios";
// We don't need the hook here since you are using the window object!

const api = axios.create({
  baseURL: "https://veritas-qqil.onrender.com",
  withCredentials: true,
});

// Helper to get the token
const getClerkToken = async () => {
  // This works because Clerk attaches the token helper on window when loaded
  if (window.Clerk && window.Clerk.session) {
    return await window.Clerk.session.getToken();
  }
  return null;
};

// Add token to every request
api.interceptors.request.use(async (config) => {
  const token = await getClerkToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Generate a new interview report
 */
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  if (resumeFile) {
    formData.append("resume", resumeFile);
  }

  // FIX: Removed the manual "Content-Type" header.
  // Axios and the browser will automatically set it WITH the required boundary string.
  const response = await api.post("/api/interview", formData);

  return response.data;
};

/**
 * Get interview report by ID
 */
export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);
  return response.data;
};

/**
 * Get all interview reports of the user
 */
export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview/");
  return response.data;
};

/**
 * Generate resume PDF
 */
export const generateResumePdf = async (interviewReportId) => {
  const response = await api.post(
    `/api/interview/resume/pdf/${interviewReportId}`,
  );
  return response.data;
};
