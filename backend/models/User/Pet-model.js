const mongoose = require("mongoose");

const { Schema } = mongoose;

const petSchema = new Schema({
  petType: String,
  petName: String,
  breed: String,
  age: String,
  gender: String,
  owner: String,
  imgURL: String,
});

module.exports = mongoose.model("Pet", petSchema, "Pets");
