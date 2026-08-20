const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const helmet = require("helmet");

const routes = require("./routes/index");

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Blinkeyit Grocery Backend is running ✅ : " + process.env.PORT,
  });
});

app.use("/api", routes);

// 404 Route Not Found Middleware
app.use((req, res, next) => {
  return res.status(404).json({
    message: "Route not found",
    error: true,
    success: false,
  });
});

// Global Error Handler Middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  const statusCode = error.statusCode || 500;
  
  return res.status(statusCode).json({
    message: error.message || "Internal Server Error",
    error: true,
    success: false,
  });
});

module.exports = app;
