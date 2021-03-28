const mongoose = require("mongoose");

const { Schema } = mongoose;

const paymentSchema = new Schema({
  petownerEmail: String,
  caretakerEmail: String,
  transferStatus: Boolean,
  amount: {
    type: mongoose.Decimal128,
    get: (v) => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)),
    default: 0,
  },
});

module.exports = mongoose.model("Payment", paymentSchema, "Payments");
