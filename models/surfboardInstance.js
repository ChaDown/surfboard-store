const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surfboardInstanceSchema = new Schema({
  size: {
    type: String,
    maxLength: 6,
  },
  model: {
    type: Schema.Types.ObjectId,
    ref: 'SurfboardModel',
  },
});

// surfboardInstanceSchema.virtual('url').get(function () {
//   return `/surfboard-instance/${this._id}`;
// });

module.exports = mongoose.model('SurfboardInstance', surfboardInstanceSchema);
