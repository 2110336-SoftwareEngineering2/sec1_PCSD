const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic user schema
const ReviewSchema = new Schema({
  Reviewer_email: String,
  Rating: { type: Number, min: 0, max: 500 },
  Description: String
});

module.exports = mongoose.model("Review", ReviewSchema, "Review");
