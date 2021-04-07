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
});

const raw_rate = new Schema({
  // rater : String,
  rate : {
    type: mongoose.Decimal128,
    get: v => new mongoose.Types.Decimal128((+v.toString()).toFixed(2)),
    min: 0, max: 5, 
    },
  comment : String,
  date: {type: Date,default: Date.now},
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
  raw_rate : [raw_rate],
  // comment : [comment],
  reserved : String,
  
});

module.exports = mongoose.model("Caretaker", CaretakerSchema, "Caretakers");
