import React from 'react'
import "../style/home.scss"
const home = () => {
    return (
      <main className="home">
        <div className="interview-input-group">
                <div className="left">
                    <label htmlFor="jobDescription">Job Descritpion</label>
            <textarea
              name="jobDescription"
              placeholder="Job Description"
            ></textarea>
          </div>
          <div className="right">
            <div className="input-group">
              <p>
                Resume{" "}
                <small className='highlight'>
                  (Use Resume and self description together for best results)
                </small>
              </p>
              <label classname="file-label" htmlFor="resume">
                Upload resume
              </label>
              <input hidden type="file" id="resume" name="resume" accept=".pdf" />
            </div>
            <div className="input-group">
              <label htmlFor="selfDescription">Self Description</label>
              <textarea name="selfDescription" id="selfDescription"></textarea>
            </div>
            <div className="button-group">
              <button className="button primary-button">Generate Interview</button>
            </div>
          </div>
        </div>
      </main>
    );
}

export default home