// backend/routes/districtCrops.js
const express = require("express");
const DistrictCrop = require("../models/districtCrop");
const router = express.Router();

// GET all districts + crops
router.get("/", async (req, res) => {
  try {
    const list = await DistrictCrop.find().sort({ district: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch district crops" });
  }
});

// GET crops for a single district
router.get("/:district", async (req, res) => {
  try {
    const name = req.params.district;

    const doc = await DistrictCrop.findOne({
      district: new RegExp("^" + name + "$", "i"),
    });

    if (!doc) return res.status(404).json({ error: "District not found" });

    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch crops for district" });
  }
});

module.exports = router;