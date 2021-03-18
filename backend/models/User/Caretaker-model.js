const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic user schema
const CaretakerSchema = new Schema({
  caretaker: String,
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
  reserved : Boolean,
  
});

module.exports = mongoose.model("Caretaker", CaretakerSchema, "Caretakers");
