const Caretaker = require("../models/User/Caretaker-model");
const User = require("../models/User/User-model");

const getCaretaker = async (req, res) => {
  const caretakerInfo = await Caretaker.findOne({caretaker:req.body.email});
  res.send(caretakerInfo);
};

const addCaretaker = async (req, res) => {
  const newCaretaker = new Caretaker({
      ...req.body,
    });
  newCaretaker.save((err) => {
      if (err) console.log(err);
  });
  res.send(newCaretaker);
};

const updateCaretaker = async (req, res) => {
    await Caretaker.updateOne({caretaker:req.body.caretaker}, req.body);
    res.send("Edit caretaker successful");
};

const SearchCaretaker = async (body,res) =>{
  const fillter = {
     rate : {$gte:0},
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
  // console.log("is run");

  await Caretaker.find(fillter, '-_id caretaker rate city province country description', (err, result) => {
    if (err) {
      res.status(400).send("not found");
    } else {
      // res.status(200).json(result);
      // console.log(fillter);
      const emaillist = [];
      const response = {};
      for (var email of result){
        emaillist.push(email.caretaker);
        response[email.caretaker] = {user: "" ,caretaker : email};
      }
      console.log(emaillist);

      User.find({ email : {$in : emaillist}}, (err, finalresult) => {
        if (err) {
          res.status(400).send(fillter);
        } else {
          for (let user of finalresult){
            response[user.email]["user"] = {
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname
            };
          }
          res.status(200).json(response);
        }
      });
    }
  });
};
module.exports = {
    addCaretaker,
    updateCaretaker,
    getCaretaker,
    SearchCaretaker
}