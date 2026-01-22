// backend/models/districtCrop.js
const mongoose = require("mongoose");

const DistrictCropSchema = new mongoose.Schema({
  district: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  crops: {
    type: [String], // array of crop names
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("DistrictCrop", DistrictCropSchema);