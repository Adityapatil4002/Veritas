import React, { useState, useEffect } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate, useParams } from "react-router-dom";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Roadmap",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
];

// ── Question Card ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index, index2Digit }) => {
  const [open, setOpen] = useState(false);
  const tag = item.tag || item.category || item.topic || "QUESTION";

  return (
    <div className={`question-card ${open ? "open" : ""}`}>
      <div className="q-card-shine"></div>
      <button className="question-header" onClick={() => setOpen(!open)}>
        <div className="q-top">
          <span className="q-tag">
            <span className="q-num">Q{index2Digit}</span>
            <span className="q-dot">•</span>
            <span className="q-cat">{tag}</span>
          </span>
          <span className={`q-toggle ${open ? "open" : ""}`}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
        <h3 className="q-title">{item.question}</h3>
      </button>

      <div className={`q-details ${open ? "open" : ""}`}>
        <div className="q-details-inner">
          <div className="q-info">
            <span className="detail-label">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Intention
            </span>
            <p>{item.intention}</p>
          </div>
          <div className="q-info answer">
            <span className="detail-label">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Model Answer
            </span>
            <p>{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Roadmap Phase Card ───────────────────────────────────────────────────────
const RoadMapDay = ({ day, index, total }) => (
  <div className="roadmap-card" style={{ animationDelay: `${index * 0.08}s` }}>
    <div className="roadmap-connector"></div>
    <div className="roadmap-day">
      <div className="day-ring">
        <span className="day-label">DAY</span>
        <strong>{day.day}</strong>
      </div>
    </div>
    <div className="roadmap-content">
      <div className="roadmap-badge">
        <span className="phase-dot"></span>
        PHASE {index + 1} / {total}
      </div>
      <h3>{day.focus}</h3>
      <ul>
        {day.tasks.map((task, i) => (
          <li key={i}>
            <span className="task-check">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            {task}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────────
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="loading-screen">
        <div className="loader-orb">
          <div className="orb-ring ring-1"></div>
          <div className="orb-ring ring-2"></div>
          <div className="orb-ring ring-3"></div>
          <div className="orb-core"></div>
        </div>
        <h1 className="pulse-text">Loading Your Strategy Report</h1>
        <p className="loading-subtext">
          Assembling insights<span className="dots"></span>
        </p>
      </main>
    );
  }

  const behavioralList =
    report.behaviouralQuestions || report.behavioralQuestions || [];

  const skillGaps = report.skillGaps || [];

  return (
    <div className="interview-page">
      {/* Animated background */}
      <div className="bg-layer">
        <div className="grid-overlay"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      {/* Top Nav */}
      <nav className="veritas-navbar fade-in-down">
        <div className="nav-left">
          <span className="brand-logo" onClick={() => navigate("/")}>
            <span className="logo-mark">◆</span>
            Veritas
          </span>
        </div>
        <div className="nav-center">
          <a onClick={() => navigate("/")} className="nav-link">
            Dashboard
          </a>
          <a href="#" className="nav-link active">
            History
          </a>
        </div>
        <div className="nav-right">
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

      <div className="interview-layout fade-in-up">
        {/* ── Left Sidebar ── */}
        <aside className="interview-sidebar">
          <div className="brand-block">
            <div className="brand-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <div>
              <div className="brand-title">Strategy Engine</div>
              <div className="brand-sub">HIGH-PERFORMANCE PREP</div>
            </div>
          </div>

          <div className="sidebar-heading">
            <span>NAVIGATION</span>
          </div>

          <nav className="interview-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={activeNav === item.id ? "active" : ""}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="nav-indicator"></span>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}

            <button
              onClick={() => getResumePdf(report._id)}
              className="resume-btn"
            >
              <span className="nav-indicator"></span>
              <span className="nav-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </span>
              <span className="nav-label">Resume</span>
              <span className="new-badge">PDF</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-score">
              <div className="score-heading">
                <span>MATCH SCORE</span>
                <strong>{report.matchScore}%</strong>
              </div>
              <div className="score-track">
                <span style={{ width: `${report.matchScore}%` }} />
              </div>
              <p>Strong compatibility with target role.</p>
            </div>

            <button className="upgrade-btn" onClick={() => navigate("/")}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              New Session
            </button>
          </div>
        </aside>

        {/* ── Center Content ── */}
        <main className="interview-main">
          {/* TECHNICAL */}
          {activeNav === "technical" && (
            <section className="section-fade">
              <div className="content-header">
                <div className="header-left">
                  <span className="eyebrow">
                    <span className="eye-dot"></span>
                    ASSESSMENT MODULE
                  </span>
                  <h1>Technical Questions</h1>
                  <p>
                    High-probability technical scenarios based on current
                    industry standards and role requirements.
                  </p>
                </div>
                <div className="header-right">
                  <div className="live-badge">
                    <span className="live-pulse"></span>
                    LIVE SYNC
                  </div>
                </div>
              </div>
              <div className="content-body">
                <div className="questions-grid">
                  {report.technicalQuestions.map((q, i) => (
                    <QuestionCard
                      key={i}
                      item={q}
                      index={i}
                      index2Digit={String(i + 1).padStart(2, "0")}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* BEHAVIORAL */}
          {activeNav === "behavioral" && (
            <section className="section-fade">
              <div className="content-header">
                <div className="header-left">
                  <span className="eyebrow">
                    <span className="eye-dot"></span>
                    CULTURE FIT ANALYSIS
                  </span>
                  <h1>Behavioral Questions</h1>
                  <p>
                    Analyze situational responses and soft-skill proficiency to
                    showcase leadership potential.
                  </p>
                </div>
                <div className="header-right">
                  <div className="live-badge">
                    <span className="live-pulse"></span>
                    LIVE SYNC
                  </div>
                </div>
              </div>
              <div className="content-body">
                <div className="questions-grid">
                  {behavioralList.map((q, i) => (
                    <QuestionCard
                      key={i}
                      item={q}
                      index={i}
                      index2Digit={String(i + 1).padStart(2, "0")}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ROADMAP */}
          {activeNav === "roadmap" && (
            <section className="section-fade">
              <div className="content-header">
                <div className="header-left">
                  <span className="eyebrow">
                    <span className="eye-dot"></span>
                    STRATEGIC ROADMAP
                  </span>
                  <h1>Preparation Roadmap</h1>
                  <p>
                    Your {report.preparationPlan.length}-day step-by-step guide
                    to systematic interview mastery.
                  </p>
                </div>
                <div className="header-right">
                  <div className="live-badge">
                    <span className="live-pulse"></span>
                    {report.preparationPlan.length} PHASES
                  </div>
                </div>
              </div>
              <div className="content-body">
                <div className="roadmap-list">
                  <div className="roadmap-timeline"></div>
                  {report.preparationPlan.map((day, i) => (
                    <RoadMapDay
                      key={day.day}
                      day={day}
                      index={i}
                      total={report.preparationPlan.length}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        {/* ── Right Sidebar ── */}
        <aside className="skill-sidebar">
          {/* Aggregate Match Score */}
          <div className="aggregate-panel">
            <div className="agg-label">AGGREGATE MATCH SCORE</div>
            <div className="agg-circle-wrap">
              <svg className="agg-circle" viewBox="0 0 120 120">
                <circle
                  className="agg-track"
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                />
                <circle
                  className="agg-progress"
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  style={{
                    strokeDasharray: 326.7,
                    strokeDashoffset: 326.7 - (326.7 * report.matchScore) / 100,
                  }}
                />
              </svg>
              <div className="agg-value">
                <span className="agg-num">{report.matchScore}</span>
                <span className="agg-pct">%</span>
              </div>
            </div>
          </div>

          {/* Skill Gaps */}
          <div className="skill-header">
            <div className="skill-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div>
              <h2>Skill Gaps</h2>
              <p>Priority focus areas</p>
            </div>
          </div>

          <div className="skill-list">
            {skillGaps.map((gap, i) => (
              <div
                key={i}
                className={`skill-item ${gap.severity.toLowerCase()}`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="skill-bar-fill"></div>
                <div className="skill-info">
                  <span className="skill-name">{gap.skill}</span>
                  {gap.description && (
                    <span className="skill-desc">{gap.description}</span>
                  )}
                </div>
                <span className="severity">{gap.severity}</span>
              </div>
            ))}
          </div>

          <div className="skill-tip">
            <span className="tip-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9.663 17h4.673M12 3v1M22 12h-1M4 12H3M18.364 5.636l-.707.707M6.343 17.657l-.707.707M18.364 18.364l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </span>
            <p>
              <strong>Pro Tip:</strong> Focus on <b>HIGH</b> severity gaps first
              to maximize interview conversion probability.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
