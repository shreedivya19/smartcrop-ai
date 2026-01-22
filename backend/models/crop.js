const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },

  districts: { type: [String], required: true },

  category: {
    type: String,
    enum: [
      "Cereals",
      "Pulses",
      "Oilseeds",
      "Fruits",
      "Vegetables",
      "Plantation",
      "Spices",
      "Flowers",
      "Medicinal",
      "Aromatic",
      "Beverages",
      "Fibers",
      "Commercial",
      "Other"
    ],
    required: true
  },

  currentPrice: Number,
  demandIndex: Number,
  yieldPotential: String
});

// Prevent “overwrite model” error
module.exports = mongoose.models.Crop || mongoose.model("Crop", CropSchema);