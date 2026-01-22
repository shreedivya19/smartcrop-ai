// backend/seed_all_crops.js
require("dotenv").config();
const mongoose = require("mongoose");
const Crop = require("./models/Crop");

// ⭐ All Karnataka crops (clean + unique + standardized)
const crops = [
  // Cereals
  { name: "Rice", category: "Cereals", districts: ["Mandya","Mysuru","Raichur","Belagavi","Davangere","Kodagu","Kalaburagi"], currentPrice: 2400, demandIndex: 85, yieldLevel: "High" },
  { name: "Jowar", category: "Cereals", districts: ["Bagalkot","Belagavi","Bidar","Dharwad","Gadag","Kalaburagi","Raichur","Vijayapura"], currentPrice: 2100, demandIndex: 70, yieldLevel: "Medium" },
  { name: "Ragi", category: "Cereals", districts: ["Mandya","Chitradurga","Mysuru","Kolar","Tumakuru"], currentPrice: 1800, demandIndex: 72, yieldLevel: "High" },
  { name: "Maize", category: "Cereals", districts: ["Hassan","Davangere","Haveri","Chikkaballapur","Belagavi"], currentPrice: 1500, demandIndex: 75, yieldLevel: "High" },

  // Oilseeds
  { name: "Groundnut", category: "Oilseeds", districts: ["Chitradurga","Ballari","Gadag","Vijayapura"], currentPrice: 5200, demandIndex: 79, yieldLevel: "Medium" },
  { name: "Sunflower", category: "Oilseeds", districts: ["Koppal","Raichur","Haveri"], currentPrice: 6200, demandIndex: 82, yieldLevel: "High" },
  { name: "Sesame", category: "Oilseeds", districts: ["Mandya","Gadag","Koppal"], currentPrice: 5500, demandIndex: 68, yieldLevel: "Medium" },

  // Commercial Crops
  { name: "Cotton", category: "Commercial", districts: ["Dharwad","Haveri","Ballari","Raichur","Mysuru"], currentPrice: 6400, demandIndex: 80, yieldLevel: "High" },
  { name: "Sugarcane", category: "Commercial", districts: ["Mandya","Belagavi","Bagalkot","Davangere"], currentPrice: 3400, demandIndex: 85, yieldLevel: "Very High" },
  { name: "Tobacco", category: "Commercial", districts: ["Mysuru","Chamarajanagar","Hassan","Belagavi"], currentPrice: 7300, demandIndex: 63, yieldLevel: "Medium" },

  // Pulses
  { name: "Tur (Pigeon Pea)", category: "Pulses", districts: ["Kalaburagi","Yadgir","Koppal"], currentPrice: 6500, demandIndex: 88, yieldLevel: "High" },
  { name: "Green Gram", category: "Pulses", districts: ["Bagalkot","Gadag"], currentPrice: 4800, demandIndex: 76, yieldLevel: "Medium" },
  { name: "Black Gram", category: "Pulses", districts: ["Bidar","Mandya"], currentPrice: 5200, demandIndex: 69, yieldLevel: "Medium" },

  // Plantations
  { name: "Coffee", category: "Plantation", districts: ["Chikkamagaluru","Kodagu","Hassan"], currentPrice: 7200, demandIndex: 90, yieldLevel: "High" },
  { name: "Pepper", category: "Plantation", districts: ["Dakshina Kannada","Kodagu","Udupi"], currentPrice: 42000, demandIndex: 55, yieldLevel: "Medium" },

  // Fruits
  { name: "Mango", category: "Fruits", districts: ["Ramanagara","Kolar","Chikkaballapur"], currentPrice: 4500, demandIndex: 84, yieldLevel: "Very High" },
  { name: "Banana", category: "Fruits", districts: ["Bagalkot","Dakshina Kannada","Udupi"], currentPrice: 1200, demandIndex: 78, yieldLevel: "High" },

  // Vegetables
  { name: "Tomato", category: "Vegetables", districts: ["Ramanagara","Haveri","Gadag"], currentPrice: 900, demandIndex: 82, yieldLevel: "High" },
  { name: "Onion", category: "Vegetables", districts: ["Chitradurga","Gadag","Vijayapura"], currentPrice: 1100, demandIndex: 80, yieldLevel: "High" },

   {
  name: "Cardamom",
  districts: ["Bengaluru Urban", "Coorg", "Hassan"],
  category: "Commercial",
  currentPrice: 95000,
  demandIndex: 88
},
{
  name: "Chilli",
  districts: ["Ballari", "Raichur", "Haveri", "Kalaburagi"],
  category: "Commercial",
  currentPrice: 12000,
  demandIndex: 90
},
{
  name: "Cashew",
  districts: ["Dakshina Kannada", "Udupi", "Uttara Kannada"],
  category: "Commercial",
  currentPrice: 18000,
  demandIndex: 75,
  yieldLevel: "Medium"
},

{
  name: "Safflower",
  districts: ["Vijayapura", "Bagalkot"],
  category: "Oilseeds",
  currentPrice: 5200,
  demandIndex: 65
},
{
  name: "Soybean",
  districts: ["Belagavi", "Haveri"],
  category: "Oilseeds",
  currentPrice: 4200,
  demandIndex: 72
},
{
  name: "Castor",
  districts: ["Koppal", "Raichur"],
  category: "Oilseeds",
  currentPrice: 6000,
  demandIndex: 70
},
{
  name: "Niger",
  districts: ["Koppal", "Gadag"],
  category: "Oilseeds",
  currentPrice: 4500,
  demandIndex: 61
},
// FRUITS (EXPANDED)
{
  name: "Papaya",
  districts: ["Mandya", "Ramanagara", "Chikkaballapur"],
  category: "Fruits",
  currentPrice: 3200,
  demandIndex: 78
},
{
  name: "Sapota (Chikoo)",
  districts: ["Bagalkot", "Ramanagara"],
  category: "Fruits",
  currentPrice: 2800,
  demandIndex: 72
},
{
  name: "Pomegranate",
  districts: ["Bagalkot", "Koppal", "Belagavi"],
  category: "Fruits",
  currentPrice: 9000,
  demandIndex: 85
},
{
  name: "Grapes",
  districts: ["Bagalkot", "Bengaluru Rural", "Kolar"],
  category: "Fruits",
  currentPrice: 6000,
  demandIndex: 88
},
{
  name: "Guava",
  districts: ["Ramanagara", "Chikkaballapur"],
  category: "Fruits",
  currentPrice: 3500,
  demandIndex: 75
},
{
  name: "Orange",
  districts: ["Kodagu", "Chikkamagaluru"],
  category: "Fruits",
  currentPrice: 7000,
  demandIndex: 65
},
{
  name: "Lemon",
  districts: ["Chitradurga", "Koppal"],
  category: "Fruits",
  currentPrice: 1800,
  demandIndex: 70
},
{
  name: "Watermelon",
  districts: ["Raichur", "Ballari"],
  category: "Fruits",
  currentPrice: 1500,
  demandIndex: 80
},
{
  name: "Jackfruit",
  districts: ["Dakshina Kannada", "Udupi", "Kodagu"],
  category: "Fruits",
  currentPrice: 2500,
  demandIndex: 85
},
{
  name: "Dragon Fruit",
  districts: ["Haveri", "Belagavi"],
  category: "Fruits",
  currentPrice: 14000,
  demandIndex: 90
},
{
  name: "Avocado",
  districts: ["Kodagu", "Chikkamagaluru"],
  category: "Fruits",
  currentPrice: 35000,
  demandIndex: 50
},
{
  name: "Custard Apple (Sitaphal)",
  districts: ["Gadag", "Ballari"],
  category: "Fruits",
  currentPrice: 5000,
  demandIndex: 72
},
{
  name: "Litchi",
  districts: ["Hassan"],
  category: "Fruits",
  currentPrice: 15000,
  demandIndex: 55
},

//Pulses
{
  name: "Bengal Gram (Chickpea)",
  districts: ["Bagalkot", "Gadag", "Belagavi", "Bidar"],
  category: "Pulses",
  currentPrice: 5400,
  demandIndex: 78
},
{
  name: "Horse Gram",
  districts: ["Chikkamagaluru", "Shivamogga", "Mandya", "Chikkaballapur"],
  category: "Pulses",
  currentPrice: 4200,
  demandIndex: 65
},
{
  name: "Cowpea (Lobia)",
  districts: ["Koppal", "Raichur", "Chamarajanagar"],
  category: "Pulses",
  currentPrice: 4600,
  demandIndex: 70
},
{
  name: "Field Pea",
  districts: ["Chitradurga", "Davangere", "Hassan"],
  category: "Pulses",
  currentPrice: 4800,
  demandIndex: 67
},
// 🌴 Plantation Crops
{
  name: "Arecanut",
  districts: ["Dakshina Kannada", "Udupi", "Shivamogga", "Chitradurga", "Uttara Kannada"],
  category: "Plantation",
  currentPrice: 48000,
  demandIndex: 84,
  yieldPotential: "High"
},

{
  name: "Coconut",
  districts: ["Tumakuru", "Udupi", "Dakshina Kannada", "Shivamogga", "Chitradurga", "Uttara Kannada"],
  category: "Plantation",
  currentPrice: 9000,
  demandIndex: 80,
  yieldPotential: "High"
},
// Bajra (Pearl Millet)
{
  name: "Bajra",
  districts: ["Koppal", "Vijayapura", "Bagalkot"],
  category: "Cereals",
  currentPrice: 1900,
  demandIndex: 68,
},

// Wheat
{
  name: "Wheat",
  districts: ["Belagavi", "Haveri", "Bagalkot", "Dharwad"],
  category: "Cereals",
  currentPrice: 2600,
  demandIndex: 73,
},
// Brinjal
{
  name: "Brinjal",
  districts: ["Kolar", "Ramanagara", "Chikkaballapur"],
  category: "Vegetables",
  currentPrice: 1500,
  demandIndex: 80,
},

// Cabbage
{
  name: "Cabbage",
  districts: ["Hassan", "Chikkamagaluru", "Kodagu"],
  category: "Vegetables",
  currentPrice: 900,
  demandIndex: 78,
},

// Cauliflower
{
  name: "Cauliflower",
  districts: ["Hassan", "Davangere", "Shivamogga"],
  category: "Vegetables",
  currentPrice: 1100,
  demandIndex: 79,
},

// Beans
{
  name: "Beans",
  districts: ["Kolar", "Ramanagara", "Hassan"],
  category: "Vegetables",
  currentPrice: 2400,
  demandIndex: 85,
},

// Carrot
{
  name: "Carrot",
  districts: ["Hassan", "Mudigere", "Chikkamagaluru"],
  category: "Vegetables",
  currentPrice: 3000,
  demandIndex: 88,
},

// Beetroot
{
  name: "Beetroot",
  districts: ["Chikkaballapur", "Ramanagara"],
  category: "Vegetables",
  currentPrice: 2200,
  demandIndex: 83,
},

// Greens (Soppu)
{
  name: "Leafy Greens (Soppu)",
  districts: ["Bengaluru Rural", "Bengaluru Urban"],
  category: "Vegetables",
  currentPrice: 700,
  demandIndex: 69,
},
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 MongoDB Connected");

    await Crop.deleteMany({});
    await Crop.insertMany(crops);
    
    console.log("🌾 All Karnataka crops seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.log("❌ Seeder error:", err);
    process.exit(1);
  }
})();