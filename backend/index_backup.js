// Routes
const cropRoutes = require("./routes/crops");
const districtRoutes = require("./routes/districts");

let waterRoutes;
try {
  waterRoutes = require("./routes/waterRoutes");
  console.log("✔️ waterRoutes.js loaded");
} catch (err) {
  console.log("❌ Failed to load waterRoutes.js:", err.message);
}

app.use("/api/crops", cropRoutes);
app.use("/api/districts", districtRoutes);

if (waterRoutes) {
  app.use("/api/water", waterRoutes);
}
