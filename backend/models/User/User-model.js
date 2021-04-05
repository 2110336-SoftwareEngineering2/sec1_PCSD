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
  balance: {
    type: mongoose.Decimal128,
    get: v => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)),
    default: 0},
});

module.exports = mongoose.model("User", userSchema, "Users");
