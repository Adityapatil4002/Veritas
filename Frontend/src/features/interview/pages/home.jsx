import React from 'react'
import "../style/home.scss"
const home = () => {
    return (
      <main className="home">
        <div className="interview-input-group">
          <div className="left">
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
              <input type="file" id="resume" name="resume" accept=".pdf" />
            </div>
            <div className="input-group">
              <label htmlFor="selfDescription">Self Description</label>
              <input
                type="file"
                id="selfDescription"
                name="selfDescription"
                accept=".pdf"
              />
              <button className="button primary-button">Generate Interview</button>
            </div>
          </div>
        </div>
      </main>
    );
}

export default home