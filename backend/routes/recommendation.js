// backend/routes/recommendation.js
const express = require("express");
const router = express.Router();

/**
 * ML / Rule-based Crop Recommendation API
 * ---------------------------------------
 * This is a placeholder logic. Later you can replace it with:
 * - Python ML model (Flask/FastAPI)
 * - TensorFlow.js model
 * - Scikit-learn model via child_process
 */

router.post("/", async (req, res) => {
  try {
    const {
      district,
      temperature,
      humidity,
      rainfall,
      ph,
      nitrogen,
      phosphorus,
      potassium
    } = req.body;

    console.log("📥 Incoming recommend request:", req.body);

    // --------------------------
    //  VALIDATION
    // --------------------------
    if (
      temperature === undefined ||
      humidity === undefined ||
      rainfall === undefined ||
      ph === undefined
    ) {
      return res.status(400).json({
        error: "Missing required fields: temperature, humidity, rainfall, ph"
      });
    }

    // --------------------------
    //  SIMPLE RULE-BASED MODEL
    //  (Replace later with real ML)
    // --------------------------
    let recommended = "Maize"; // default

    if (rainfall > 800 && ph < 7) recommended = "Paddy (Rice)";
    if (nitrogen > 90) recommended = "Sugarcane";
    if (phosphorus < 40) recommended = "Banana";
    if (temperature > 32) recommended = "Chilli";
    if (potassium > 80) recommended = "Groundnut";

    // District preference logic
    if (district) {
      const districtMap = {
        Mandya: "Sugarcane",
        Mysuru: "Ragi",
        "Dakshina Kannada": "Arecanut",
        Belagavi: "Maize",
        Ballari: "Cotton"
      };

      if (districtMap[district]) {
        recommended = districtMap[district];
      }
    }

    // --------------------------
    //  RESPONSE
    // --------------------------
    return res.json({
      recommended_crop: recommended,
      inputs_used: {
        district,
        temperature,
        humidity,
        rainfall,
        ph,
        nitrogen,
        phosphorus,
        potassium
      }
    });
  } catch (err) {
    console.error("❌ Recommendation Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;