import React, { useState, useRef, useEffect } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  // Cursor glow tracking for premium feel
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      resumeInputRef.current.files = e.dataTransfer.files;
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loader-orb">
          <div className="orb-ring ring-1"></div>
          <div className="orb-ring ring-2"></div>
          <div className="orb-ring ring-3"></div>
          <div className="orb-core"></div>
        </div>
        <h1 className="pulse-text">Initializing Strategic Algorithms</h1>
        <p className="loading-subtext">
          Calibrating assets against market demands
          <span className="dots"></span>
        </p>
      </main>
    );
  }

  return (
    <div className="veritas-layout">
      {/* Animated background layers */}
      <div className="bg-layer">
        <div className="grid-overlay"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div
          className="cursor-glow"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        ></div>
      </div>

      {/* --- TOP NAVBAR --- */}
      <nav className="veritas-navbar fade-in-down">
        <div className="nav-left">
          <span className="brand-logo">
            <span className="logo-mark">◆</span>
            Veritas
          </span>
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
          <button className="icon-btn" aria-label="Notifications">
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
            <span className="notification-dot"></span>
          </button>
          <button className="icon-btn user-btn" aria-label="Profile">
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
          <div className="header-badge">
            <span className="badge-dot"></span>
            <span>AI-Powered Interview Intelligence</span>
          </div>
          <h1>
            Define Your <span className="gradient-text">Target</span>
          </h1>
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
              <div className="panel-shine"></div>
              <div className="panel-header">
                <div className="icon-wrapper">
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
                </div>
                <div>
                  <h2>Target Job Description</h2>
                  <span className="panel-tag">PASTE REQUIREMENTS</span>
                </div>
              </div>
              <p className="panel-subtitle">
                Input detailed role specifications, primary responsibilities,
                and technical requirements.
              </p>
              <div className="input-wrapper">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  id="jobDescription"
                  placeholder="Paste the full job description here..."
                  className="animated-input"
                />
                <div className="char-counter">
                  {jobDescription.length} chars
                </div>
              </div>
            </div>

            {/* Desktop Button */}
            <button
              onClick={handleGenerateReport}
              className="action-btn desktop-btn"
              type="button"
            >
              <span className="btn-bg"></span>
              <span className="btn-content">
                <svg
                  className="btn-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Commence Simulation
                <svg
                  className="btn-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </span>
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="grid-right">
            <div className="panel glowing-border fade-in-up stagger-2">
              <div className="panel-shine"></div>
              <div className="panel-header">
                <div className="icon-wrapper">
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
                </div>
                <div>
                  <h2>Quick Self-Description</h2>
                  <span className="panel-tag">YOUR BACKGROUND</span>
                </div>
              </div>
              <p className="panel-subtitle">
                Briefly describe your core expertise, career objectives, and key
                achievements.
              </p>
              <div className="input-wrapper">
                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  id="selfDescription"
                  className="small-textarea animated-input"
                  placeholder="Describe your relevant experience and goals..."
                />
              </div>
            </div>

            <div className="panel glowing-border fade-in-up stagger-3">
              <div className="panel-shine"></div>
              <div className="panel-header">
                <div className="icon-wrapper">
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
                </div>
                <div>
                  <h2>Baseline Data (Resume)</h2>
                  <span className="panel-tag">CURRENT ASSETS</span>
                </div>
              </div>
              <p className="panel-subtitle">
                Upload your latest curriculum vitae for architectural review.
              </p>
              <label
                className={`file-upload-zone ${dragActive ? "drag-active" : ""} ${fileName ? "has-file" : ""}`}
                htmlFor="resume"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {!fileName ? (
                  <>
                    <div className="upload-icon-wrapper">
                      <svg
                        className="upload-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                    <span className="upload-text">
                      Drag & drop or{" "}
                      <span className="highlight">click to browse</span>
                    </span>
                    <span className="upload-limits">PDF, DOCX • Max 5MB</span>
                  </>
                ) : (
                  <>
                    <div className="upload-icon-wrapper success">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span className="upload-text">{fileName}</span>
                    <span className="upload-limits">Click to change file</span>
                  </>
                )}
              </label>
              <input
                ref={resumeInputRef}
                hidden
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Mobile Button */}
          <button
            onClick={handleGenerateReport}
            className="action-btn mobile-btn fade-in-up stagger-4"
            type="button"
          >
            <span className="btn-bg"></span>
            <span className="btn-content">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Initialize Strategy Session
            </span>
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
              <a href="#" className="view-all">
                View All →
              </a>
            </div>
            <div className="sessions-grid">
              {reports.map((report, index) => (
                <div
                  key={report._id}
                  className="session-card"
                  style={{ animationDelay: `${0.1 * index}s` }}
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <div className="card-glow"></div>
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

      {/* --- BOTTOM FOOTER (Desktop) --- */}
      <footer className="veritas-footer fade-in-up stagger-5">
        <div className="footer-brand">
          <span className="logo-mark">◆</span> Veritas
        </div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Documentation</a>
        </div>
        <div className="footer-copyright">© 2026 Veritas Strategic Systems</div>
      </footer>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="mobile-bottom-nav">
        <a href="#" className="mobile-nav-item active">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Dashboard</span>
        </a>
        <a href="#" className="mobile-nav-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          <span>Prep</span>
        </a>
        <a href="#" className="mobile-nav-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>History</span>
        </a>
        <a href="#" className="mobile-nav-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Network</span>
        </a>
      </nav>
    </div>
  );
};

export default Home;
