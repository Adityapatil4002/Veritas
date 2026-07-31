import React, { useState } from "react";
import "../style/interview.scss";

const Interview = ({ interviewData }) => {
  const [activeSection, setActiveSection] = useState("technical");
  const [openQuestion, setOpenQuestion] = useState(null);

  /*
    Use the prop when your API data is available.

    Example:
    <Interview interviewData={data} />
  */

  const data = interviewData || {
    matchScore: 65,

    technicalQuestions: [
      {
        question:
          "How do you handle microservices orchestration in a large-scale system?",
        intention: "Test architectural knowledge beyond CRUD applications.",
        answer:
          "I would discuss service discovery, API gateways, and orchestration tools like Kubernetes or event-driven patterns using message brokers like RabbitMQ or Kafka.",
      },
      {
        question:
          "Explain the difference between optimistic and pessimistic locking in databases.",
        intention:
          "Evaluate depth in database management for high-concurrency environments.",
        answer:
          "Optimistic locking checks for version changes before commit; pessimistic locking locks the row at the start of the transaction.",
      },
      {
        question:
          "How would you optimize a React application that is experiencing re-render performance issues?",
        intention:
          "Check proficiency in React internals and performance profiling.",
        answer:
          "Use React.memo, useMemo, useCallback, code splitting with Suspense, and virtualization for long lists.",
      },
      {
        question:
          "What are the trade-offs of choosing NoSQL over SQL in a mission-critical system?",
        intention:
          "Assess understanding of database architecture trade-offs (ACID vs BASE).",
        answer:
          "SQL offers consistency and complex joins; NoSQL provides scalability and flexibility for unstructured data.",
      },
      {
        question: "How do you ensure security in a Node.js API?",
        intention: "Check security best practices.",
        answer:
          "Use helmet for headers, rate limiting, JWT validation, sanitize inputs, and prevent XSS/CSRF.",
      },
      {
        question:
          "Explain the concept of 'Event Loop' in Node.js and its impact on performance.",
        intention: "Check low-level understanding of Node.js.",
        answer:
          "It allows non-blocking I/O operations by offloading tasks to the system kernel, maintaining a single thread for execution.",
      },
      {
        question: "How do you implement CI/CD for a full-stack application?",
        intention: "Evaluate DevOps mindset.",
        answer:
          "Automate testing via Jenkins/GitHub Actions, build Docker images, and deploy via Vercel or cloud providers using blue-green deployments.",
      },
      {
        question:
          "What is the 'Decorator' pattern and how is it used in TypeScript?",
        intention: "Check language-specific design pattern knowledge.",
        answer:
          "Decorators provide a way to add annotations and metadata to classes and methods, commonly used in frameworks like NestJS.",
      },
      {
        question:
          "How do you handle state management across complex applications?",
        intention: "Understand application-level architecture.",
        answer:
          "Discuss use of Context API for simple, Redux Toolkit or Zustand for complex, global state.",
      },
      {
        question:
          "What are the complexities of deploying machine learning models to production?",
        intention:
          "Bridge the gap between data science and production engineering.",
        answer:
          "Model drift, latency, monitoring, hardware resource constraints, and versioning models.",
      },
    ],

    behaviouralQuestions: [
      {
        question:
          "Describe a time you had to resolve a conflict within your technical team.",
        intention: "Evaluate soft skills and collaborative spirit.",
        answer:
          "Focus on active listening, objective data-driven decision-making, and prioritizing project goals.",
      },
      {
        question:
          "How do you manage technical debt when working under tight deadlines?",
        intention: "Check ability to balance business vs engineering needs.",
        answer:
          "Acknowledge the need for shortcuts but emphasize documenting and scheduling refactoring cycles.",
      },
      {
        question:
          "Tell me about a project where you failed or faced a major setback.",
        intention: "Assess growth mindset and resilience.",
        answer:
          "Highlight lessons learned, root cause analysis, and preventive measures implemented.",
      },
      {
        question: "How do you stay up-to-date with new technologies?",
        intention: "Evaluate intellectual curiosity.",
        answer:
          "Discuss newsletters, open-source contribution, technical blogs, and building side projects.",
      },
      {
        question:
          "Why are you looking for a Senior role at this stage of your career?",
        intention: "Test professional awareness vs experience level.",
        answer:
          "Focus on desire for higher accountability, architectural influence, and mentorship.",
      },
    ],

    skillGaps: [
      {
        skill: "System Design & Architecture",
        severity: "high",
      },
      {
        skill: "Production Monitoring & Observability",
        severity: "high",
      },
      {
        skill: "Distributed Systems Principles",
        severity: "medium",
      },
      {
        skill: "Advanced DevOps/Kubernetes",
        severity: "medium",
      },
      {
        skill: "Leadership & Mentorship Experience",
        severity: "high",
      },
    ],

    preparationPlan: [
      {
        day: 1,
        focus: "System Design Fundamentals",
        tasks: [
          "Study load balancing, caching strategies, and database sharding.",
        ],
      },
      {
        day: 2,
        focus: "Scalability Patterns",
        tasks: [
          "Read about microservices communication, message queues, and event-driven design.",
        ],
      },
      {
        day: 3,
        focus: "Backend Performance",
        tasks: [
          "Deep dive into Node.js event loop optimizations and memory management.",
        ],
      },
      {
        day: 4,
        focus: "Advanced Database Theory",
        tasks: [
          "Master ACID/BASE properties and SQL performance indexing strategies.",
        ],
      },
      {
        day: 5,
        focus: "Security Best Practices",
        tasks: [
          "Study OWASP Top 10 and implementation of secure authentication flows.",
        ],
      },
      {
        day: 6,
        focus: "CI/CD & DevOps",
        tasks: [
          "Review Docker fundamentals and design a sample CI/CD pipeline in YAML.",
        ],
      },
      {
        day: 7,
        focus: "System Design Practice",
        tasks: [
          "Attempt to design a URL shortener or a notification system (End-to-End).",
        ],
      },
      {
        day: 8,
        focus: "Advanced React Patterns",
        tasks: [
          "Review complex state management libraries (Redux/Zustand) and Server Components.",
        ],
      },
      {
        day: 9,
        focus: "Testing Strategies",
        tasks: [
          "Practice integration testing with Jest, Cypress, or Playwright.",
        ],
      },
      {
        day: 10,
        focus: "Behavioural Preparation",
        tasks: [
          "Draft STAR method answers for common leadership and conflict scenarios.",
        ],
      },
      {
        day: 11,
        focus: "Monitoring & SRE",
        tasks: [
          "Study logs, metrics, tracing, and tools like Prometheus/Grafana.",
        ],
      },
      {
        day: 12,
        focus: "Code Quality & Refactoring",
        tasks: ["Review clean code principles, SOLID, and design patterns."],
      },
      {
        day: 13,
        focus: "Mock Interviews",
        tasks: [
          "Record yourself solving two system design problems and review them.",
        ],
      },
      {
        day: 14,
        focus: "Final Review",
        tasks: [
          "Review personal project architecture and identify potential performance bottlenecks.",
        ],
      },
    ],
  };

  const sections = {
    technical: {
      label: "Technical Questions",
      title: "Technical Questions",
      subtitle:
        "Practice the technical concepts most likely to come up in your interview.",
    },

    behavioural: {
      label: "Behavioral Questions",
      title: "Behavioral Questions",
      subtitle:
        "Prepare structured responses for communication, leadership, and teamwork scenarios.",
    },

    roadmap: {
      label: "Road Map",
      title: "14-Day Preparation Road Map",
      subtitle:
        "Follow this focused preparation plan to strengthen your interview readiness.",
    },
  };

  const toggleQuestion = (index) => {
    setOpenQuestion((current) => (current === index ? null : index));
  };

  const renderQuestions = (questions) => (
    <div className="questions-list">
      {questions?.map((item, index) => {
        const isOpen = openQuestion === index;

        return (
          <article
            className={`question-card ${isOpen ? "open" : ""}`}
            key={`${item.question}-${index}`}
          >
            <button
              className="question-header"
              type="button"
              onClick={() => toggleQuestion(index)}
            >
              <div className="question-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3>{item.question}</h3>

              <span className="question-toggle">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <div className="question-details">
                <div className="question-info intention">
                  <span className="detail-label">Why they ask this</span>
                  <p>{item.intention}</p>
                </div>

                <div className="question-info answer">
                  <span className="detail-label">Suggested approach</span>
                  <p>{item.answer}</p>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );

  const renderRoadMap = () => (
    <div className="roadmap-list">
      {data.preparationPlan?.map((item) => (
        <article className="roadmap-card" key={item.day}>
          <div className="roadmap-day">
            <span>DAY</span>
            <strong>{String(item.day).padStart(2, "0")}</strong>
          </div>

          <div className="roadmap-content">
            <h3>{item.focus}</h3>

            <ul>
              {item.tasks?.map((task, index) => (
                <li key={`${item.day}-${index}`}>{task}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "technical":
        return renderQuestions(data.technicalQuestions);

      case "behavioural":
        return renderQuestions(data.behaviouralQuestions);

      case "roadmap":
        return renderRoadMap();

      default:
        return null;
    }
  };

  const currentSection = sections[activeSection];

  return (
    <main className="interview-page">
      <div className="interview-layout">
        {/* LEFT NAVIGATION */}
        <aside className="interview-sidebar">
          <div className="sidebar-heading">
            <span className="sidebar-heading-icon">✦</span>
            <span>Interview Plan</span>
          </div>

          <nav className="interview-nav">
            {Object.entries(sections).map(([key, section]) => (
              <button
                type="button"
                key={key}
                className={activeSection === key ? "active" : ""}
                onClick={() => {
                  setActiveSection(key);
                  setOpenQuestion(null);
                }}
              >
                <span className="nav-dot"></span>
                {section.label}
              </button>
            ))}
          </nav>

          <div className="sidebar-score">
            <div className="score-heading">
              <span>Profile Match</span>
              <strong>{data.matchScore}%</strong>
            </div>

            <div className="score-track">
              <span style={{ width: `${data.matchScore}%` }}></span>
            </div>

            <p>
              Your profile currently matches approximately {data.matchScore}% of
              the target role.
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="interview-main">
          <header className="content-header">
            <span className="eyebrow">PERSONALIZED STRATEGY</span>

            <h1>{currentSection.title}</h1>

            <p>{currentSection.subtitle}</p>
          </header>

          <div className="content-body">{renderContent()}</div>
        </section>

        {/* RIGHT SKILL GAPS */}
        <aside className="skill-sidebar">
          <div className="skill-header">
            <span className="skill-icon">⚡</span>

            <div>
              <h2>Skill Gaps</h2>
              <p>Areas to prioritize</p>
            </div>
          </div>

          <div className="skill-list">
            {data.skillGaps?.map((item, index) => (
              <div
                className={`skill-item ${item.severity}`}
                key={`${item.skill}-${index}`}
              >
                <span className="skill-name">{item.skill}</span>
                <span className="severity">{item.severity}</span>
              </div>
            ))}
          </div>

          <div className="skill-tip">
            <span>i</span>

            <p>
              Focus on <strong>high priority</strong> gaps first while following
              your preparation roadmap.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Interview;
