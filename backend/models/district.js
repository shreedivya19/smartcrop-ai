const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
  name: String,
  crops: [String],
  geometry: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('District', DistrictSchema);
