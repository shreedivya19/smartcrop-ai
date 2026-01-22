const mongoose = require("mongoose");

const PricePointSchema = new mongoose.Schema({
  cropId: { type: mongoose.Schema.Types.ObjectId, ref: "Crop", required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  // optional: store demand snapshot if you want
  demandIndex: { type: Number, default: null }
});

PricePointSchema.index({ cropId: 1, date: 1 });

module.exports = mongoose.model("PricePoint", PricePointSchema);