const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, farm, district } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ success: false, error: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      farm,
      district,
    });

    return res.json({ success: true, message: "User created successfully" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: "Signup failed" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ success: false, error: "Invalid email or password" });

  const match = await user.comparePassword(password);
  if (!match)
    return res.status(400).json({ success: false, error: "Invalid email or password" });

  // Create token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      farm: user.farm,
      district: user.district,
    }
  });
});

module.exports = router;