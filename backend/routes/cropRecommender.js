const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { temperature, humidity, condition } = req.body;

  let crops = [];

  if (temperature > 26 && humidity < 60)
    crops = ["Ragi", "Maize", "Groundnut"];

  if (temperature < 24 && humidity > 70)
    crops = ["Paddy", "Sugarcane", "Banana"];

  if (condition === "Rain")
    crops = ["Rice", "Arecanut", "Pepper"];

  return res.json({
    recommended_crops: crops,
  });
});

module.exports = router;