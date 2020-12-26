const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  animal: { type: String, required: true },
  animalname: { type: String, required: true },
  selectedGender: { type: String, required: true },
  selectedSize: { type: String, required: true },
  location: { type: String, required: true },
  houseTrained: { type: String, required: true },
  age: { type: String, required: true },
  health: { type: String, required: true },
  imagePath: {type: String, required: true},
  aboutanimal: { type: String, required: true },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Post',postSchema);
