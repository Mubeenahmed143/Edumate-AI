const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chatRoutes");
const notesRoutes = require("./routes/notesRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", chatRoutes);
app.use("/api", notesRoutes);
app.use("/api", quizRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "EduMate AI Backend is running 🚀",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`EduMate AI Server running on http://localhost:${PORT}`);
});