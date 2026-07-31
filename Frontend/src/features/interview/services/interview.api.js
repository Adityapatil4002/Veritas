import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    
})

/**
 * 
 * @description generate a new interview report on the basis of user self desciption, resume pdf and job description 
 */
export const generateInterviewReport = ({ jobDescription, selfDescription, resumeFile }) => { 
    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const reposnse = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}


/**
 * 
 * @description get the interview report on the basis of interviewId
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}


/**
 * 
 * @description get all the interview reports of the user
 */
export const getAllInterviewReports = async () => { 
    const response = await api.get("/api/interview/")

    return response.data
}