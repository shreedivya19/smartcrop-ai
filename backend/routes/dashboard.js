const express = require("express");
const Crop = require("../models/Crop");
const router = express.Router();

// GET DASHBOARD ANALYTICS
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();

    // Total crops
    const total = crops.length;

    // Average price
    const avgPrice =
      crops.reduce((sum, c) => sum + (c.currentPrice || 0), 0) / total || 0;

    // Top crop by demand
    const topCrop =
      crops.sort((a, b) => b.demandIndex - a.demandIndex)[0] || null;

    // PRICE TREND (avg price by category)
    const categories = ["Cereals", "Pulses", "Oilseeds", "Commercial", "Plantation", "Spices"];

    const priceTrend = categories.map((cat) => {
      const filtered = crops.filter((c) => c.category === cat);
      const avg =
        filtered.reduce((s, c) => s + (c.currentPrice || 0), 0) /
          (filtered.length || 1);
      return { category: cat, value: avg };
    });

    // DEMAND TREND
    const demandTrend = categories.map((cat) => {
      const filtered = crops.filter((c) => c.category === cat);
      const avg =
        filtered.reduce((s, c) => s + (c.demandIndex || 0), 0) /
          (filtered.length || 1);
      return { category: cat, value: avg };
    });

    res.json({
      total,
      avgPrice: Math.round(avgPrice),
      topCrop,
      priceTrend,
      demandTrend,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard data error" });
  }
});

module.exports = router;