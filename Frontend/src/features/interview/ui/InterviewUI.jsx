import React from "react";
import "../style/home.scss";

const InterviewUI = () => {
  return (
    <main className="home">
      <div className="interview-input-group">
        <section className="left card">
          <div className="card-header">
            <h3>
              Target Job Description <span className="required">REQUIRED</span>
            </h3>
          </div>
          <textarea
            name="jobDescription"
            placeholder="Paste the full job description here..."
            maxLength={5000}
          />
          <div className="char-count">0 / 5000 chars</div>
        </section>

        <aside className="right card">
          <div className="profile-section">
            <h3>Your Profile</h3>

            <div className="upload-box">
              <label className="file-label" htmlFor="resume">
                Click to upload or drag & drop
              </label>
              <input
                hidden
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.docx"
              />
            </div>

            <div className="or-sep">OR</div>

            <label htmlFor="selfDescription">Quick Self-Description</label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience..."
            />

            <div className="info-note">
              Either a Resume or a Self Description is required to generate a
              personalized plan.
            </div>
          </div>

          <div className="generate-row">
            <button className="button primary-button">
              Generate My Interview Strategy
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default InterviewUI;
