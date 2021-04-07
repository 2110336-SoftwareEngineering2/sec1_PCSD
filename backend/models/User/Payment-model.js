const mongoose = require("mongoose");

const { Schema } = mongoose;

const paymentSchema = new Schema({
  petownerEmail: String,
  petownerFname: String,
  petownerLname: String,
  caretakerEmail: String,
  caretakerFname: String,
  caretakerLname: String,
  transferStatus: String,
  amount: {
    type: mongoose.Decimal128,
    get: (v) => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)),
    default: 0,
  },
});

module.exports = mongoose.model("Payment", paymentSchema, "Payments");
