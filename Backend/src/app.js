const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.routes");

const app = express();

app.use(
  cors({
    origin: ["https://veritas-seven-indol.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;
