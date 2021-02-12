const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic user schema
const userSchema = new Schema({
  username: String,
  email: String,
  firstname: String,
  lastname: String,
  mobileNumber: String,
  password: String,
  banStatus: Boolean,
});

module.exports = mongoose.model("User", userSchema, "Users");
