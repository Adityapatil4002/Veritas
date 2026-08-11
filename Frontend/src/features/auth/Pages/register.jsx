import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../services/hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FIX: Destructure 'register' instead of 'handleRegister'
  const { loading, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // FIX: Await the 'register' function
      await register({ username, email, password });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="forom-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => {
                setusername(e.target.value);
              }}
              type="text"
              id="username"
              name="username"
              placeholder="Enter you username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter you email address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              placeholder="enter the password"
            />
          </div>
          <button className="button primary-button">Register</button>
        </form>

        <p>
          Already have an account? <Link to={"/login"}>login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
