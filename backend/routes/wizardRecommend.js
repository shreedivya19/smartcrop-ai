const express = require("express");
const axios = require("axios");
const router = express.Router();

/**
 * POST /api/wizard-recommend
 * Body:
 * {
 *   district: string,
 *   land: number,
 *   soil: string,
 *   irrigation: string,
 *   experience: string
 * }
 */
router.post("/", async (req, res) => {
  try {
    const { district, land, soil, irrigation, experience } = req.body;

    if (!district || !land || !soil || !irrigation || !experience) {
      return res.status(400).json({
        error: "Missing fields: district, land, soil, irrigation, experience",
      });
    }

    // 🔗 Call Flask ML service
    const flaskURL = "http://127.0.0.1:5001/wizard_recommend";

    const response = await axios.post(flaskURL, {
      district,
      land,
      soil,
      irrigation,
      experience,
    });

    // Expecting: { recommendedCrop, confidence, reason }
    return res.json(response.data);
  } catch (err) {
    console.error("❌ Wizard recommend error:", err.message);
    return res.status(500).json({
      error: "Wizard recommendation failed",
      details: err.message,
    });
  }
});

module.exports = router;