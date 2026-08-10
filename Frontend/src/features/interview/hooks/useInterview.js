import { getAllInterviewReports, getInterviewReportById, generateInterviewReport, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context.jsx"
import {useParams} from "react-router-dom"


export const useInterview = () => {
  const context = useContext(InterviewContext);

  const { interviewId } = useParams();

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  // useInterview.jsx

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let response = null; // Initialize outer variable
    try {
      // FIX: Removed 'const' to update the outer 'response' variable instead of creating a new one
      response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
    } catch (error) {
      console.error("Error generating interview report:", error);
    } finally {
      setLoading(false);
    }

    // FIX: Added optional chaining to prevent crashes if the try block fails
    return response?.interviewReport;
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let response = null;
    try {
      response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
    } catch (error) {
      console.error("Error getting interview report by Id");
    } finally {
      setLoading(false);
    }
    return response.interviewReport;
  };

  const getReports = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getAllInterviewReports();
      setReports(response.interviewReports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateResumePdf(interviewReportId);
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      //link.parentNode.removeChild(link)
    } catch (error) {
      console.error("Error generating resume pdf:", error);
    } finally {
      setLoading(false);
    }
    return response;
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};