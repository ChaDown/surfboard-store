const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurfboardModelSchema = new Schema({
  style: {
    type: String,
    enum: ['Shortboard', 'Longboard', 'Fish', 'Foamboard'],
    required: true,
  },
  shaper: {
    type: Schema.Types.ObjectId,
    ref: 'Shaper',
  },
  model: { type: String, required: true },
  price: {
    type: String,
  },
  image: String,
});

// Make a virtual url for each model
SurfboardModelSchema.virtual('url').get(function () {
  return `/surfboardModel/${this._id}`;
});

module.exports = mongoose.model('SurfboardModel', SurfboardModelSchema);
