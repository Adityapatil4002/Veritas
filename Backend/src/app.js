const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// FIX: Explicit CORS configuration for production credentials
app.use(
  cors({
    origin: "https://veritas-seven-indol.vercel.app", // MUST match your Vercel URL exactly (no trailing slash)
    credentials: true, // MUST be true for cookies to be sent back and forth
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

// ... rest of your routes (e.g., app.use("/api/auth", authRoutes))

module.exports = app;
