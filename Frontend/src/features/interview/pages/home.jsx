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
        <div className="cyber-loader">
          <div className="spinner"></div>
          <div className="spinner-inner"></div>
        </div>
        <h1 className="pulse-text">Initializing strategic algorithms...</h1>
        <p className="loading-subtext">
          Calibrating assets against market demands
        </p>
      </main>
    );
  }

  return (
    <div className="veritas-layout">
      {/* --- TOP NAVBAR --- */}
      <nav className="veritas-navbar fade-in-down">
        <div className="nav-left">
          <span className="brand-logo">Veritas</span>
        </div>
        <div className="nav-center">
          <a href="#" className="nav-link active">
            Dashboard
          </a>
          <a href="#" className="nav-link">
            Strategy Prep
          </a>
          <a href="#" className="nav-link">
            History
          </a>
          <a href="#" className="nav-link">
            Network
          </a>
        </div>
        <div className="nav-right">
          <button className="icon-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <button className="icon-btn user-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </nav>

      <main className="veritas-main">
        {/* --- HEADER --- */}
        <header className="page-header fade-in-up">
          <h1>Define Your Target</h1>
          <p>
            Initialize strategic preparation algorithms. Calibrate assets
            against market demands to maximize conversion probability.
          </p>
        </header>

        {/* --- MAIN GRID --- */}
        <div className="strategy-grid">
          {/* LEFT COLUMN */}
          <div className="grid-left fade-in-up stagger-1">
            <div className="panel glowing-border">
              <div className="panel-header">
                <svg
                  className="icon-cyan"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
                <h2>Target Job Description</h2>
              </div>
              <p className="panel-subtitle">
                Input detailed role specifications, primary responsibilities,
                and technical requirements.
              </p>
              <div className="input-wrapper">
                <textarea
                  onChange={(e) => setJobDescription(e.target.value)}
                  id="jobDescription"
                  placeholder="Paste job description here..."
                  className="animated-input"
                />
              </div>
            </div>

            {/* Desktop Button */}
            <button
              onClick={handleGenerateReport}
              className="action-btn desktop-btn pulse-glow"
              type="button"
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Commence Simulation
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="grid-right">
            <div className="panel glowing-border fade-in-up stagger-2">
              <div className="panel-header">
                <svg
                  className="icon-cyan"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
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
                  className="small-textarea animated-input"
                  placeholder="Describe your experience here..."
                />
              </div>
            </div>

            <div className="panel glowing-border fade-in-up stagger-3">
              <div className="panel-header">
                <svg
                  className="icon-cyan"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
                <h2>Current Assets</h2>
              </div>
              <p className="panel-subtitle">
                Upload your latest curriculum vitae or supporting documentation
                for architectural review.
              </p>
              <label
                className="file-upload-zone animated-dropzone"
                htmlFor="resume"
              >
                <svg
                  className="upload-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
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
            className="action-btn mobile-btn pulse-glow fade-in-up stagger-4"
            type="button"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Initialize Strategy Session
          </button>
        </div>

        {/* --- RECENT SESSIONS --- */}
        {reports && reports.length > 0 && (
          <section className="recent-sessions fade-in-up stagger-4">
            <div className="sessions-header">
              <h3>
                <svg
                  className="icon-cyan"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Recent Sessions
              </h3>
            </div>
            <div className="sessions-grid">
              {reports.map((report, index) => (
                <div
                  key={report._id}
                  className="session-card card-hover"
                  style={{ animationDelay: `${0.1 * index}s` }}
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <div className="session-info">
                    <h4>{report.title || "Untitled Position"}</h4>
                    <p className="session-meta">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {new Date(report.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="session-score">
                    <span className="score-pill">
                      {report.matchScore}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* --- BOTTOM FOOTER --- */}
      <footer className="veritas-footer fade-in-up stagger-5">
        <div className="footer-brand">Veritas</div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Technical Documentation</a>
        </div>
        <div className="footer-copyright">
          © 2026 Veritas Strategic Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
