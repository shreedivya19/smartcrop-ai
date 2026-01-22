// backend/seed_more_fruits.js
require("dotenv").config();
const mongoose = require("mongoose");
const Crop = require("./models/Crop");

const more = [
  { name: "Sapota (Chikoo)", districts: ["Dakshina Kannada","Udupi","Mysuru"], category: "Fruits", currentPrice: 1800, demandIndex: 75, yieldPotential: "High" },
  { name: "Papaya", districts: ["Ramanagara","Hassan","Tumakuru"], category: "Fruits", currentPrice: 900, demandIndex: 70, yieldPotential: "High" },
  { name: "Pomegranate", districts: ["Bagalkot","Gadag","Bijapur"], category: "Fruits", currentPrice: 4000, demandIndex: 85, yieldPotential: "Medium" },
  { name: "Grapes (Bangalore Blue)", districts: ["Bengaluru Rural","Hassan","Chikkaballapur"], category: "Fruits", currentPrice: 6000, demandIndex: 88, yieldPotential: "High" },
  { name: "Guava", districts: ["Kolar","Tumakuru"], category: "Fruits", currentPrice: 1300, demandIndex: 68, yieldPotential: "Medium" },
  { name: "Orange", districts: ["Mysuru","Kodagu"], category: "Fruits", currentPrice: 2200, demandIndex: 70, yieldPotential: "Medium" },
  { name: "Lemon", districts: ["Tumakuru","Chikkaballapur"], category: "Fruits", currentPrice: 2800, demandIndex: 66, yieldPotential: "Medium" },
  { name: "Watermelon", districts: ["Davangere","Haveri"], category: "Fruits", currentPrice: 600, demandIndex: 60, yieldPotential: "High" },
  { name: "Jackfruit", districts: ["Dakshina Kannada","Kasaragod","Shivamogga"], category: "Fruits", currentPrice: 700, demandIndex: 55, yieldPotential: "High" },
  { name: "Dragon Fruit", districts: ["Hassan","Bengaluru Urban"], category: "Fruits", currentPrice: 5200, demandIndex: 74, yieldPotential: "Medium" },
  { name: "Avocado", districts: ["Kodagu","Coorg"], category: "Fruits", currentPrice: 7200, demandIndex: 60, yieldPotential: "Low" },
  { name: "Custard Apple", districts: ["Mysuru","Hassan"], category: "Fruits", currentPrice: 2400, demandIndex: 52, yieldPotential: "Low" },
  { name: "Arecanut", districts: ["Dakshina Kannada","Kodagu","Udupi"], category: "Plantation", currentPrice: 9000, demandIndex: 82, yieldPotential: "High" },
  { name: "Coconut", districts: ["Uttara Kannada","Dakshina Kannada","Udupi"], category: "Plantation", currentPrice: 2800, demandIndex: 78, yieldPotential: "High" },
  { name: "Pineapple", districts: ["Shivamogga","Dakshina Kannada"], category: "Plantation", currentPrice: 1600, demandIndex: 64, yieldPotential: "Medium" },
  { name: "Coffee Cherries", districts: ["Chikkamagaluru","Kodagu"], category: "Plantation", currentPrice: 12000, demandIndex: 90, yieldPotential: "High" }
  // add more if you want...
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cropai");
    console.log("🟢 MongoDB Connected - seeding more fruits");
    for (const c of more) {
      // upsert to avoid duplicates by name
      await Crop.updateOne({ name: c.name }, { $set: c }, { upsert: true });
    }
    console.log("🌾 More fruits / plantation crops seeded successfully!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  }
})();