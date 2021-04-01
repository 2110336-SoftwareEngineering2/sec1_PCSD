const mongoose = require("mongoose");

const { Schema } = mongoose;

const reserveSchema = new Schema({
  type: [],
  startDate: String,
  endDate: String,
  pets: []
});

module.exports = mongoose.model("Reserve", reserveSchema, "Reservations");
