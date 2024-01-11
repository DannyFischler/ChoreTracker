const mongoose = require('mongoose');

const choreSchema = new mongoose.Schema({
  chore_name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date_approved: {
    type: Date
  },
  date_completed: {
    type: Date
  },
  parent_comments: {
    type: String
  },
  child_comments: {
    type: String
  }
});

const Chore = mongoose.model('Chore', choreSchema);

module.exports = Chore;
