import mongoose from "mongoose";

const { Schema } = mongoose;

const petSchema = new Schema({
  petName: String,
  breed: String,
  age: Number,
  gender: String,
  owner: String,
});

module.exports = mongoose.model("Pet", petSchema);
