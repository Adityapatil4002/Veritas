const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
// If you have interview routes, also import them:
// const interviewRoutes = require("./routes/interview.routes");

const app = express();

// CORS for production
app.use(
  cors({
    origin: "https://veritas-seven-indol.vercel.app", // ← make sure this is exactly your Vercel URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

// Mount the routes
app.use("/api/auth", authRoutes);
// app.use("/api/interview", interviewRoutes); // uncomment if you have this

module.exports = app;
