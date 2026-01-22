const mongoose = require("mongoose");
const Crop = require("./models/Crop");

mongoose.connect("mongodb://127.0.0.1:27017/cropai");

const newPulses = [
  {
    name: "Red Gram (Tur)",
    districts: ["Kalaburagi", "Yadgir", "Raichur"],
    category: "Pulses",
    currentPrice: 6600,
    demandIndex: 84,
    yieldPotential: "High"
  },
  {
    name: "Bengal Gram (Chickpea)",
    districts: ["Bidar", "Gadag", "Dharwad"],
    category: "Pulses",
    currentPrice: 5200,
    demandIndex: 79,
    yieldPotential: "Moderate"
  },
  {
    name: "Green Gram (Moong)",
    districts: ["Bagalkot", "Gadag", "Chitradurga"],
    category: "Pulses",
    currentPrice: 4800,
    demandIndex: 76,
    yieldPotential: "Moderate"
  },
  {
    name: "Black Gram (Urad)",
    districts: ["Bidar", "Mandya", "Chamarajanagar"],
    category: "Pulses",
    currentPrice: 5300,
    demandIndex: 72,
    yieldPotential: "Moderate"
  },
  {
    name: "Horse Gram",
    districts: ["Haveri", "Tumakuru", "Mandya"],
    category: "Pulses",
    currentPrice: 3900,
    demandIndex: 68,
    yieldPotential: "Low"
  },
  {
    name: "Cowpea (Lobia)",
    districts: ["Koppal", "Raichur", "Bellary"],
    category: "Pulses",
    currentPrice: 4200,
    demandIndex: 73,
    yieldPotential: "Moderate"
  },
  {
    name: "Field Pea",
    districts: ["Chikkamagaluru", "Kodagu"],
    category: "Pulses",
    currentPrice: 5100,
    demandIndex: 77,
    yieldPotential: "Moderate"
  }
];

async function seed() {
  await Crop.insertMany(newPulses);
  console.log("✅ Extra Pulses added successfully!");
  process.exit();
}

seed();