const express = require("express");
const axios = require("axios");
const Crop = require("../models/Crop");

const router = express.Router();

// GET /api/crops/:id/details?horizon=30
router.get("/:id/details", async (req, res) => {
  try {
    const { id } = req.params;
    const horizon = req.query.horizon || 30;

    const crop = await Crop.findById(id);

    if (!crop) return res.status(404).json({ error: "Crop not found" });

    // Call ML service
    const response = await axios.post("http://127.0.0.1:5001/predict_forecast", {
      district: crop.districts[0],
      type: "price",
      horizon
    });

    return res.json({
      crop,
      forecast: response.data,
    });

  } catch (err) {
    console.error("cropDetails error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;