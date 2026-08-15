import React, {useState, useRef} from "react";
import "../style/home.scss";
import {useInterview} from "../hooks/useInterview"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  //const [resume, setResume] = useState(null)
  const resumeInputRef = useRef();
  const navigate = useNavigate();



  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    // FIX: Use '_id' because MongoDB documents default to '_id'
    if (data?._id) {
      navigate(`/interview/${data._id}`);
    }
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Generating your interview plan...</h1>
      </main>
    );
  }

  return (
    <main className="home">
      <div className="home-header">
        <h1>
          Create Your Custom <span>Interview Plan</span>
        </h1>

        <p>
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </div>
      <div className="interview-card">
        <div className="interview-input-group">
          {/* LEFT SIDE */}
          <div className="left">
            <div className="section-header">
              <div className="section-title">
                <span className="icon">▣</span>
                <label htmlFor="jobDescription">Target Job Description</label>
              </div>

              <span className="tag">REQUIRED</span>
            </div>

            <div className="job-description-wrapper">
              <textarea
                onChange={(e) => {
                  setJobDescription(e.target.value);
                }}
                id="jobDescription"
                name="jobDescription"
                maxLength={5000}
                placeholder={`Paste the full job description here...
e.g. "Senior Frontend Engineer at Google requires
proficiency in React, TypeScript, and large-scale system
design..."`}
              />

              <span className="character-count">0 / 5000 chars</span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="right">
            <div className="section-header profile-header">
              <div className="section-title">
                <span className="icon profile-icon">♙</span>
                <p>Your Profile</p>
              </div>
            </div>

            {/* RESUME */}
            <div className="input-group resume-group">
              <div className="input-title">
                <label htmlFor="resume">Upload Resume</label>
                <span className="tag">BEST RESULTS</span>
              </div>

              <label className="file-label" htmlFor="resume">
                <span className="upload-icon">↑</span>

                <span className="upload-title">
                  Click to upload or drag &amp; drop
                </span>

                <span className="upload-subtitle">PDF or DOCX (Max 5MB)</span>
              </label>

              <input
                ref={resumeInputRef}
                hidden
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
              />
            </div>

            {/* DIVIDER */}
            <div className="divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            {/* SELF DESCRIPTION */}
            <div className="input-group self-description-group">
              <label htmlFor="selfDescription">Quick Self-Description</label>

              <textarea
                onChange={(e) => {
                  setSelfDescription(e.target.value);
                }}
                name="selfDescription"
                id="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>

            {/* INFO */}
            <div className="info-box">
              <span className="info-icon">i</span>

              <p>
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required to generate a
                personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="card-footer">
          <p>AI-Powered Strategy Generation · Approx 30s</p>

          <button
            onClick={handleGenerateReport}
            className="generate-button"
            type="button"
          >
            <span>★</span>
            Generate My Interview Strategy
          </button>
        </div>
      </div>
     
      {reports.length > 0 && (
        <section className="recent-reports">
          <h2>Recent Reports</h2>
          <ul className="reports-list">
            {reports.map((report) => (
              <li
                // FIX 1: Change 'id' to '_id' for the unique key
                key={report._id}
                className="report-item"
                // FIX 2: Change 'id' to '_id' for the navigation route
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                {/* FIX 3: Change 'reports.title' (the array) to 'report.title' (the individual object) */}
                <h3>{report.title || "Untitled Position"}</h3>

                <p className="report-meta">
                  Generated on {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <p
                  className={`match-score ${report.matchScore >= 80 ? "score--high" : report.matchScore >= 60 ? "score--mid" : "score--low"}`}
                >
                  {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="home-footer">
        <a href="/">Privacy Policy</a>
        <a href="/">Terms of Service</a>
        <a href="/">Help Center</a>
      </div>
    </main>
  );
};;

export default Home;
