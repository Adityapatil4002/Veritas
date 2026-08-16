import React, { useState, useRef } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    if (data?._id) {
      navigate(`/interview/${data._id}`);
    }
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loader"></div>
        <h1>Initializing strategic algorithms...</h1>
      </main>
    );
  }

  return (
    <main className="veritas-home">
      {/* HEADER */}
      <header className="page-header">
        <h1>Define Your Target</h1>
        <p>
          Initialize strategic preparation algorithms. Calibrate assets against
          market demands to maximize conversion probability.
        </p>
      </header>

      {/* MAIN GRID */}
      <div className="strategy-grid">
        {/* LEFT COLUMN */}
        <div className="grid-left">
          <div className="panel">
            <div className="panel-header">
              <span className="icon-cyan">⊚</span>
              <h2>Target Job Description</h2>
            </div>
            <p className="panel-subtitle">
              Input detailed role specifications, primary responsibilities, and
              technical requirements.
            </p>
            <div className="input-wrapper">
              <textarea
                onChange={(e) => setJobDescription(e.target.value)}
                id="jobDescription"
                placeholder="Paste job description here..."
              />
            </div>
          </div>

          {/* Desktop Button */}
          <button
            onClick={handleGenerateReport}
            className="action-btn desktop-btn"
            type="button"
          >
            <span className="btn-icon">▷</span> Commence Simulation
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <div className="grid-right">
          <div className="panel">
            <div className="panel-header">
              <span className="icon-cyan">♙</span>
              <h2>Quick Self-Description</h2>
            </div>
            <p className="panel-subtitle">
              Briefly describe your core expertise, career objectives, and key
              achievements.
            </p>
            <div className="input-wrapper">
              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                id="selfDescription"
                className="small-textarea"
                placeholder="Describe your experience here..."
              />
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <span className="icon-cyan">⊟</span>
              <h2>Current Assets</h2>
            </div>
            <p className="panel-subtitle">
              Upload your latest curriculum vitae or supporting documentation
              for architectural review.
            </p>
            <label className="file-upload-zone" htmlFor="resume">
              <span className="upload-icon">📄</span>
              <span className="upload-text">
                Drag and drop files or click to browse
              </span>
              <span className="upload-limits">PDF, DOCX (Max 5MB)</span>
            </label>
            <input
              ref={resumeInputRef}
              hidden
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={handleGenerateReport}
          className="action-btn mobile-btn"
          type="button"
        >
          <span className="btn-icon">⚡</span> Initialize Strategy Session
        </button>
      </div>

      {/* RECENT SESSIONS */}
      {reports && reports.length > 0 && (
        <section className="recent-sessions">
          <div className="sessions-header">
            <h3>
              <span className="icon-cyan">◷</span> Recent Sessions
            </h3>
          </div>
          <div className="sessions-grid">
            {reports.map((report) => (
              <div
                key={report._id}
                className="session-card"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <div className="session-info">
                  <h4>{report.title || "Untitled Position"}</h4>
                  <p className="session-meta">
                    <span className="date-icon">📅</span>{" "}
                    {new Date(report.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="session-score">
                  <span className="score-pill">{report.matchScore}% Match</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
