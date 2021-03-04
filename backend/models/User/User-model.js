const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic user schema
const userSchema = new Schema({
  username: String,
  email: String,
  firstname: String,
  lastname: String,
  mobileNumber: String,
  gender: String,
  password: String,
  role: String,
  banStatus: Boolean,
  balance: mongoose.Types.Decimal128,
});

module.exports = mongoose.model("User", userSchema, "Users");
