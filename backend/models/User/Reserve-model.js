const mongoose = require("mongoose");

const { Schema } = mongoose;

const reserveSchema = new Schema({
  service: String,
  caretaker: String,
  petowner: String,
  startDate: Number,
  endDate: Number,
  rate: Number,
  amount: Number,
  pets: [],
  paymentId: String,
});

module.exports = mongoose.model("Reserve", reserveSchema, "Reservations");
