const express = require("express");
const router = express.Router();

/*
  Dummy weather API
  Replace this with real API later (OpenWeather / IMD etc.)
*/

router.get("/:district", (req, res) => {
  const { district } = req.params;

  return res.json({
    district,
    current: {
      temperature: 28,
      humidity: 65,
      wind: 10,
      condition: "Sunny"
    },
    forecast: [
      { "day": "Fri", "temp": 26, "condition": "Rain" },
      { "day": "Sat", "temp": 28, "condition": "Sunny" },
      { "day": "Sun", "temp": 29, "condition": "Cloudy" },
      { "day": "Mon", "temp": 24, "condition": "Rain" },
      { "day": "Tue", "temp": 27, "condition": "Sunny" }
    ]
  });
});

module.exports = router;