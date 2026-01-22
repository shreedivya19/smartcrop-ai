// backend/routes/waterRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

/*
  This route returns a simple water availability object:
  { rainfall, humidity, temperature, evapotranspiration, waterAvailable, status }

  Query:
    /api/water?district=Mandya

  How it works:
  - If OPENWEATHER_API_KEY is set in .env it uses OpenWeather OneCall (current & daily)
    to compute rainfall/temperature/humidity.
  - If not set or the external call fails, it returns a safe mocked response.
*/

// Small mapping of example districts -> lat/lon (add more as needed)
const DISTRICT_COORDS = {
  "Bengaluru": { lat: 12.9716, lon: 77.5946 },
  "Bengaluru Rural": { lat: 13.0, lon: 77.5 },
  "Mandya": { lat: 12.5231, lon: 76.8950 },
  "Mysuru": { lat: 12.2958, lon: 76.6394 },
  "Raichur": { lat: 16.2065, lon: 77.3630 },
  "Kodagu": { lat: 12.3375, lon: 75.8069 },
  "Chikkamagaluru": { lat: 13.3189, lon: 75.7760 },
  "Haveri": { lat: 14.7939, lon: 75.4057 },
  // add more mappings as you like
};

function estimateEvapo(tempC, radiationFactor = 1) {
  // Simple heuristic estimate (not a scientific PET): PET ≈ 0.36 * temp (mm/day) scaled
  // Keep it simple; replace with a real equation later if needed.
  return +(0.36 * Math.max(tempC, 0) * radiationFactor).toFixed(2);
}

function statusFromWater(waterAvailable) {
  if (waterAvailable <= 0) return "Low";
  if (waterAvailable < 20) return "Moderate";
  return "High";
}

router.get("/", async (req, res) => {
  const district = req.query.district || "Bengaluru";
  const coords = DISTRICT_COORDS[district] || DISTRICT_COORDS["Bengaluru"];
  const apiKey = process.env.OPENWEATHER_API_KEY;

  // If API key is present try real fetch
  if (apiKey) {
    try {
      // onecall requires lat & lon
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;
      const resp = await axios.get(url, { timeout: 8000 });
      const current = resp.data.current || {};
      const daily = resp.data.daily && resp.data.daily[0] ? resp.data.daily[0] : {};

      // rainfall: OpenWeather puts rain as 'rain' mm in daily or in current
      const rainfall = (daily.rain || current.rain || 0);
      const humidity = current.humidity ?? 0;
      const temperature = current.temp ?? (daily.temp ? daily.temp.day : 0);

      // Estimate evapotranspiration & net water available
      const evapotranspiration = estimateEvapo(temperature);
      const waterAvailable = +(rainfall - evapotranspiration).toFixed(2);

      return res.json({
        district,
        lat: coords.lat,
        lon: coords.lon,
        rainfall,
        humidity,
        temperature,
        evapotranspiration,
        waterAvailable,
        status: statusFromWater(waterAvailable),
        source: "openweather",
      });
    } catch (err) {
      console.warn("⚠️ OpenWeather fetch failed:", err.message || err);
      // fallthrough to mock below
    }
  }

  // Fallback mock response if no API key or network issue
  const mockTemp = 28;
  const mockRain = 50; // mm
  const mockHumidity = 70;
  const evapotranspiration = estimateEvapo(mockTemp);
  const waterAvailable = +(mockRain - evapotranspiration).toFixed(2);

  return res.json({
    district,
    lat: coords.lat,
    lon: coords.lon,
    rainfall: mockRain,
    humidity: mockHumidity,
    temperature: mockTemp,
    evapotranspiration,
    waterAvailable,
    status: statusFromWater(waterAvailable),
    source: "mock",
  });
});

module.exports = router;