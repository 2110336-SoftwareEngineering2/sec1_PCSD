const Caretaker = require("../models/User/Caretaker-model");

const addCaretaker = async (req, res) => {
    const newCaretaker = new Caretaker({
        ...req.body,
      });
    newCaretaker.save((err) => {
        if (err) console.log(err);
    });
    res.send(newCaretaker);
};

const updateCaretaker = async (body) => {
    await Caretaker.updateOne({email:body.email}, body);
  };

const getCaretaker = async (body,res) =>{
    const fillter = {
       rate : {$gte:0},
      //  $or : [{city : "Bangkok"}]
    };
    if ( body.minrate ){
      fillter.rate.$gte = body.minrate;
    }
    if ( body.maxrate ){
      fillter.rate.$lte = body.maxrate;
    }

    if (body.type){
      fillter.type = { $in : body.type };
    }

    if (body.pet_type){
      fillter.pet_type = { $in : body.pet_type };
    }

    if (body.address){
      fillter.$or = [
        {city:{ $regex: body.address , $options: "i"}},
        {province:{ $regex: body.address , $options: "i"}},
        {country:{ $regex: body.address , $options: "i"}}  ];
    }

    await Caretaker.find(fillter, (err, result) => {
      if (err) {
        res.status(400).send(fillter);
      } else {
        res.status(200).json(result);
        console.log(fillter);
      }
    });
};
module.exports = {
    addCaretaker,
    updateCaretaker,
    getCaretaker
}