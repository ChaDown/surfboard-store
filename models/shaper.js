const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShaperSchema = new Schema({
  shaperName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  location: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  image: String,
});

// Make a virtual url for each model
ShaperSchema.virtual('url').get(function () {
  return `/shaper/${this._id}`;
});

module.exports = mongoose.model('Shaper', ShaperSchema);
