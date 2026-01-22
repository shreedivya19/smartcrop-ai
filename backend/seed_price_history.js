require("dotenv").config();
const mongoose = require("mongoose");
const Crop = require("./models/Crop");
const PricePoint = require("./models/pricePoint");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cropai");

    console.log("🟢 MongoDB Connected");

    const crops = await Crop.find({}).lean();

    if (!crops.length) {
      console.log("No crops found to seed. Make sure crops collection exists.");
      process.exit(0);
    }

    const horizon = 60; // days to create history for
    const today = new Date();
    today.setHours(0,0,0,0);

    const ops = [];

    for (const crop of crops) {
      // Starting value near crop.currentPrice or a random number
      let base = crop.currentPrice || (Math.random() * 5000 + 1000);

      // generate day-by-day small random fluctuation
      for (let i = horizon - 1; i >= 0; --i) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        // add small noise
        const noise = Math.round((Math.sin(i/3) + Math.random()*0.5) * 50);
        base = Math.max(10, Math.round(base + noise));
        ops.push({
          cropId: crop._id,
          date: d,
          price: base,
          demandIndex: crop.demandIndex || Math.round(60 + Math.random()*30)
        });
      }
    }

    // optional: clear old history for fresh seed
    await PricePoint.deleteMany({});
    await PricePoint.insertMany(ops);
    console.log("🌾 Price history seeded for all crops (approx)", ops.length);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seeder error:", err);
    process.exit(1);
  }
})();