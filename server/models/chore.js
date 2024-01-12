const mongoose = require("mongoose");

const choreSchema = new mongoose.Schema({
  chore_name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date_approved: {
    type: Date,
  },
  date_completed: {
    type: Date,
  },
  isCompleted: {
    type: Boolean,
  },
});

const Chore = mongoose.model("Chore", choreSchema);

module.exports = Chore;
