const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//const Chore = require('./chore');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, sparse: true },
  password: { type: String, required: true },
  parentId: { type: String, required: false },
  //isChild: { type: Boolean, default: false },
  //parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //savedChores: [Chore]
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model("user", userSchema);
