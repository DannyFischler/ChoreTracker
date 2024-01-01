const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  parent_name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;
