// backend/routes/weatherRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const districtCoords = require("../data/districtCoords");

const API_KEY = process.env.WEATHER_API_KEY;

router.get("/", async (req, res) => {
  const district = req.query.district || "Mysuru";
  const coords = districtCoords[district];

  if (!coords) {
    return res.json({ success: false, error: `Unknown district: ${district}` });
  }

  const { lat, lon } = coords;

  try {
    const CURRENT_URL =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    const FORECAST_URL =
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    const [currentRes, forecastRes] = await Promise.all([
      axios.get(CURRENT_URL),
      axios.get(FORECAST_URL),
    ]);

    return res.json({
      success: true,
      district,
      current: {
        temp: currentRes.data.main.temp,
        humidity: currentRes.data.main.humidity,
        wind: currentRes.data.wind.speed,
        condition: currentRes.data.weather[0].description,
      },
      forecast: forecastRes.data.list.map(item => ({
        time: item.dt_txt,
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed,
        condition: item.weather[0].description,
      }))
    });

  } catch (err) {
    console.log("Weather API error:", err.message);
    return res.json({ success: false, error: "Weather API failed" });
  }
});

module.exports = router;