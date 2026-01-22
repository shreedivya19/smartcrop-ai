const express = require("express");
const router = express.Router();

const districts = [
  "Bengaluru Urban", "Bengaluru Rural", "Kolar", "Tumakuru", "Mysuru",
  "Mandya", "Kodagu", "Hassan", "Chikkamagaluru", "Shivamogga",
  "Haveri", "Davanagere", "Ballari", "Raichur", "Vijayapura",
  "Kalaburagi", "Belagavi", "Bagalkot", "Dharwad", "Udupi", "Dakshina Kannada",
];

router.get("/", (req, res) => {
  res.json(districts);
});

module.exports = router;