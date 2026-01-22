// backend/routes/forecast.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

/**
 * POST /api/forecast
 * Body:
 * {
 *    "district": "Mandya",
 *    "crop": "ragi",
 *    "horizon": 14
 * }
 */
router.post("/", async (req, res) => {
  try {
    const { district, crop, horizon } = req.body;

    // ----------------------------
    // 1. Validation
    // ----------------------------
    if (!district || !crop || !horizon) {
      return res.status(400).json({
        error: "Missing fields: district, crop, horizon",
      });
    }

    // ----------------------------
    // 2. Call Flask ML Forecast API
    // ----------------------------
    const flaskURL = "http://127.0.0.1:5001/predict_forecast";

    const response = await axios.post(flaskURL, {
      district,
      crop,
      horizon: Number(horizon),
    });

    // ----------------------------
    // 3. Return Flask output to frontend
    // ----------------------------
    return res.json({
      success: true,
      district: response.data.district,
      crop: response.data.crop,
      labels: response.data.labels,
      values: response.data.values,
    });

  } catch (err) {
    console.error("❌ Forecast API Error:", err.message);

    return res.status(500).json({
      error: "Forecast fetch failed",
      details: err.message,
    });
  }
});

module.exports = router;