const mongoose = require("mongoose");

const { Schema } = mongoose;

const petSchema = new Schema({
  petName: String,
  breed: String,
  age: String,
  gender: String,
  owner: String,
});

module.exports = mongoose.model("Pet", petSchema, "Pets");
