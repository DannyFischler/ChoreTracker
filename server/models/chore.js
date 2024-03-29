const mongoose = require("mongoose");
const user = require("./user.js");

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
  userId: {
    type: String,
  },
});

const Chore = mongoose.model("Chore", choreSchema);

module.exports = Chore;
