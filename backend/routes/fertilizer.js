// backend/routes/fertilizer.js
const express = require("express");
const router = express.Router();

/**
 * POST /api/fertilizer
 * body: { crop, ph, nitrogen, phosphorus, potassium, district, season }
 * returns: { npkDeficiency: {N,P,K,pH}, recommendations: [{name, notes, doseKgPerHa}], pHAdvice, notes }
 */
router.post("/", (req, res) => {
  try {
    const { crop, ph, nitrogen, phosphorus, potassium, district, season } = req.body;

    // Simple heuristic rules (replace with ML or rules later)
    const npk = { N: "Unknown", P: "Unknown", K: "Unknown", pH: ph ?? "—" };

    // classify nutrient levels
    const classify = (x) => {
      if (x == null || isNaN(x)) return "Unknown";
      if (x < 30) return "Low";
      if (x < 60) return "Medium";
      return "High";
    };

    npk.N = classify(nitrogen);
    npk.P = classify(phosphorus);
    npk.K = classify(potassium);

    // simple recommendations example (should be crop + district tuned)
    const recs = [];

    // N recommendation
    if (npk.N === "Low") recs.push({ name: "Urea (46% N)", notes: "Split application during growth stages", doseKgPerHa: 50 });
    else if (npk.N === "Medium") recs.push({ name: "Urea (46% N)", notes: "One application at planting", doseKgPerHa: 30 });

    // P recommendation
    if (npk.P === "Low") recs.push({ name: "DAP (18-46-0)", notes: "Apply at planting for root development", doseKgPerHa: 40 });

    // K recommendation
    if (npk.K === "Low") recs.push({ name: "MOP (0-0-60)", notes: "Apply before flowering", doseKgPerHa: 30 });

    // pH advice
    let pHAdvice = null;
    if (ph < 5.5) pHAdvice = "Soil is acidic: consider lime application";
    else if (ph > 8.0) pHAdvice = "Soil is alkaline: consider sulfur or organic matter";
    else pHAdvice = "pH is within optimal range";

    // Add organic suggestions (if you later add toggle)
    const organic = [
      { name: "Vermicompost", notes: "Good organic source of nutrients", doseKgPerHa: 2000 },
      { name: "Neem cake", notes: "Adds N slowly and helps pests", doseKgPerHa: 500 }
    ];

    return res.json({
      npkDeficiency: npk,
      recommendations: recs,
      organicOptions: organic,
      pHAdvice,
      notes: `Basic heuristic suggestions for ${crop || "selected crop"}`
    });
  } catch (err) {
    console.error("fertilizer error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;