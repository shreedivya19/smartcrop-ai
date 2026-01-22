require('dotenv').config();
const mongoose = require('mongoose');

// Models
const Crop = require('./models/Crop');
const District = require('./models/district');

// JSON data
const data = require('./data/karnataka_crops.json');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log("🌿 MongoDB Connected!");

  // Clear old data
  await Crop.deleteMany({});
  await District.deleteMany({});

  console.log("🗑 Previous data removed.");

  // Insert crops
  await Crop.insertMany(data.crops);
  console.log("🌱 Crops inserted:", data.crops.length);

  // Insert districts
  await District.insertMany(data.districts);
  console.log("📍 Districts inserted:", data.districts.length);

  console.log("✅ Seeding completed successfully!");
  process.exit();
})
.catch(err => {
  console.error("❌ Error seeding database:", err);
  process.exit(1);
});
