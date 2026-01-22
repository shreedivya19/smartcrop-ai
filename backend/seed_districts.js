const mongoose = require("mongoose");
const District = require("./models/district");

const districts = [
  "Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban",
  "Bidar","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga",
  "Dakshina Kannada","Davangere","Dharwad","Gadag","Hassan","Haveri",
  "Kalaburagi","Kodagu","Kolar","Koppal","Mandya","Mysuru","Raichur",
  "Ramanagara","Shivamogga","Tumakuru","Udupi","Uttara Kannada",
  "Vijayanagara","Vijayapura","Yadgir"
];

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/cropai");

  await District.deleteMany({});
  await District.insertMany(districts.map(d => ({ district: d })));

  console.log("🌍 All 31 districts seeded!");
  process.exit();
})();