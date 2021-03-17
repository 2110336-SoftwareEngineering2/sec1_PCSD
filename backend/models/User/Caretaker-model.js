const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic user schema
const CaretakerSchema = new Schema({
  email: String,
  type : [String],
  pet_type : [String],
  city : String,
  province : String,
  country : String,
  description : String,
  role : String,
  available_day : [String],
  rate: {
    type: mongoose.Decimal128,
    get: v => new mongoose.Types.Decimal128((+v.toString()).toFixed(2))
    },
  reserved : String,
  
});

module.exports = mongoose.model("Caretaker", CaretakerSchema, "Users");
