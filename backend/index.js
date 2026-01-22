require("dotenv").config();  // Load .env FIRST
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const auth = require("./middleware/auth");   // <--- USE THIS
const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- DEBUG CHECK ---------------- */
console.log("🌍 Weather API Key:", process.env.WEATHER_API_KEY);

/* ---------------- SIMPLE HEALTH CHECK ---------------- */
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: Date.now() });
});

/* ------------- PROTECTED DASHBOARD ROUTE --------------- */
app.get("/api/dashboard", protect, (req, res) => {
  res.json({
    success: true,
    message: "User authenticated",
    user: req.user,
  });
});
/* ---------------- ROUTES ---------------- */
app.use("/api/auth", require("./routes/auth"));   // <-- AUTH API
app.use("/api/crops", require("./routes/crops"));
app.use("/api/districts", require("./routes/districts"));
app.use("/api/district-crops", require("./routes/districtCrops"));
app.use("/api/water", require("./routes/waterRoutes"));
app.use("/api/weather", require("./routes/weatherRoutes"));
app.use("/api/forecast", require("./routes/forecast"));
app.use("/api/recommend", require("./routes/recommendation"));
app.use("/api/recommend-crop", require("./routes/cropRecommender"));
app.use("/api/weather-forecast", require("./routes/weatherForecast"));
app.use("/api/fertilizer", require("./routes/fertilizer"));
app.use("/api/crops", require("./routes/cropDetails"));

const wizardRecommendRoutes = require("./routes/wizardRecommend");
app.use("/api/wizard-recommend", wizardRecommendRoutes);

/* ---------------- MONGO CONNECTION ---------------- */
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cropai";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("🟢 MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    console.log("⚠️ Running without MongoDB!");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  });