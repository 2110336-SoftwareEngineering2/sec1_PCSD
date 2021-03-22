const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic user schema
const comment = new Schema({
  email: String,
  text: String,
  date: {type: Date,default: Date.now}
});

const rate_point = new Schema({
  sum_rate : {
    type: mongoose.Decimal128,
    get: v => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)),
    },
  rate_count : {type: Number},
  raw_rate : {
    rater : String,
    rate : {
      type: mongoose.Decimal128,
      get: v => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)),
      },
  }
});

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
  rate : {
    type: mongoose.Decimal128,
    get: v => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)),
    },
  rate_point : {type: rate_point,default:{
    sum_rate : 0,
    rate_count : 0,
  }},
  comment : [comment],
  reserved : String,
  
});

module.exports = mongoose.model("Caretaker", CaretakerSchema, "Caretakers");
