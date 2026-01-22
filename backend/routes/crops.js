const express = require("express");
const Crop = require("../models/Crop");
const router = express.Router();

// GET all crops OR crops by district
router.get("/", async (req, res) => {
  try {
    const { district, category } = req.query;

    let query = {};

    // Filter by district (case-insensitive)
    if (district) {
      query.districts = { $regex: new RegExp(`^${district}$`, "i") };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    const crops = await Crop.find(query).sort({ name: 1 });
    res.json(crops);

  } catch (err) {
    console.error("Error fetching crops:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;