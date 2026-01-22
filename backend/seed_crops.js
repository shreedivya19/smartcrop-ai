require("dotenv").config();
const mongoose = require("mongoose");
const Crop = require("./models/Crop");

const crops = [
  {
    name: "Rice (Paddy)",
    districts: ["Mandya", "Mysuru", "Raichur"],
    category: "Cereals",
    currentPrice: 2400,
    demandIndex: 85,
    yieldPotential: "High"
  },
  {
    name: "Ragi (Finger Millet)",
    districts: ["Bengaluru Rural", "Kolar", "Tumakuru"],
    category: "Cereals",
    currentPrice: 1800,
    demandIndex: 72,
    yieldPotential: "High"
  },
  {
    name: "Jowar (Sorghum)",
    districts: ["Vijayapura", "Kalaburagi"],
    category: "Cereals",
    currentPrice: 2100,
    demandIndex: 68,
    yieldPotential: "Medium"
  },
  {
    name: "Maize",
    districts: ["Haveri", "Davanagere"],
    category: "Cereals",
    currentPrice: 1500,
    demandIndex: 75,
    yieldPotential: "High"
  },

  // PULSES
  {
    name: "Tur (Pigeon Pea)",
    districts: ["Kalaburagi", "Yadgir"],
    category: "Pulses",
    currentPrice: 6500,
    demandIndex: 88,
    yieldPotential: "Very High"
  },

  // OILSEEDS
  {
    name: "Groundnut",
    districts: ["Chitradurga", "Ballari"],
    category: "Oilseeds",
    currentPrice: 5200,
    demandIndex: 79,
    yieldPotential: "Medium"
  },
  {
    name: "Sunflower",
    districts: ["Koppal", "Raichur"],
    category: "Oilseeds",
    currentPrice: 6200,
    demandIndex: 82,
    yieldPotential: "High"
  },

  // COMMERCIAL & PLANTATION
  {
    name: "Coffee",
    districts: ["Chikkamagaluru", "Kodagu", "Hassan"],
    category: "Plantation",
    currentPrice: 9500,
    demandIndex: 92,
    yieldPotential: "Very High"
  },
  {
    name: "Sugarcane",
    districts: ["Mandya", "Belagavi"],
    category: "Commercial",
    currentPrice: 3400,
    demandIndex: 85,
    yieldPotential: "Very High"
  },
  {
    name: "Cotton",
    districts: ["Dharwad", "Haveri"],
    category: "Commercial",
    currentPrice: 6400,
    demandIndex: 80,
    yieldPotential: "High"
  },

  // SPICES
  {
    name: "Black Pepper",
    districts: ["Kodagu", "Udupi"],
    category: "Spices",
    currentPrice: 45000,
    demandIndex: 95,
    yieldPotential: "High"
  }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Crop.deleteMany({});
    await Crop.insertMany(crops);
    console.log("🌱 Crops seeded successfully!");
    mongoose.disconnect();
  })
  .catch((err) => console.log(err));