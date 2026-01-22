/// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function protect(req, res, next) {
  let token;

  // Extract token from Authorization header
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token → reject
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "No token provided — Authentication required",
    });
  }

  try {
    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        error: "Invalid token format",
      });
    }

    // Load user info from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    // Attach user to request object
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    next();
  } 
  catch (err) {
    return res.status(401).json({
      success: false,
      error: "Token invalid or expired",
      message: err.message,
    });
  }
}

module.exports = protect;