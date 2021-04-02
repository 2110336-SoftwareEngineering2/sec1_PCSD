const mongoose = require("mongoose");

const { Schema } = mongoose;

const reserveSchema = new Schema({
  service: String,
  caretaker: String,
  petowner: String,
  startDate: Number,
  endDate: Number,
  status: Number,
  rate: Number,
  pets: []
});

module.exports = mongoose.model("Reserve", reserveSchema, "Reservations");
