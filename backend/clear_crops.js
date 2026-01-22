const mongoose = require("mongoose");
const Crop = require("./models/Crop");
require("dotenv").config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Crop.deleteMany({});
  console.log("🧹 All old crops deleted.");
  process.exit(0);
})();