const Crop = require('../models/Crop');

exports.getCrops = async (req, res) => {
  const crops = await Crop.find().limit(200);
  res.json(crops);
};

exports.searchCrops = async (req, res) => {
  const q = req.query.q || '';
  const crops = await Crop.find({ name: { $regex: q, $options: 'i' } }).limit(50);
  res.json(crops);
};

exports.getCropByName = async (req, res) => {
  const name = req.params.name;
  const crop = await Crop.findOne({ name: new RegExp('^' + name + '$', 'i') });
  if (!crop) return res.status(404).json({ error: 'Crop not found' });

  res.json(crop);
};
