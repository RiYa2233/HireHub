const express = require("express");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(express.json());

app.use("/student", studentRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/placement_portal")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 HireHub Backend Server Running...");
});

// Server Start
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});