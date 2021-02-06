import mongoose from "mongoose";

const { Schema } = mongoose;

// Basic user schema
const userSchema = new Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  mobileNumber: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
