const mongoose = require('mongoose');

const choreSchema = new mongoose.Schema({
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Parent'
  },
  chore_name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
 completed_by_child_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Child'
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
