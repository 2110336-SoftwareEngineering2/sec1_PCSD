const Caretaker = require("../models/User/Caretaker-model");
const User = require("../models/User/User-model");

const getCaretaker = async (req, res) => {
  const caretakerInfo = await Caretaker.findOne({caretaker:req.body.caretaker});
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

const rate = async (body,res) =>{
  if(body.rate<=5 && body.rate>=0 ){
    Caretaker.updateOne({caretaker:body.caretaker}, 
      { $push: { 
          raw_rate: {
            rater : body.rater,
            rate : body.rate
          }
        },
        $inc : {
            'rate_point.rate_count' : 1,
            'rate_point.sum_rate' : body.rate
        }
      },(err, result) => {
        if(err){
          console.log(err);
          res.status(400).send("err");
        }
        else{
          res.send("rate caretaker successful")
        }
      });
  }
  else{
    res.status(400).send("rate out of range");
  }
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

  await Caretaker.find(fillter, '-_id caretaker rate city province country description rate_point', (err, result) => {
    if (err) {
      res.status(400).send("not found");
    } else {
      // res.status(200).json(result);
      // console.log(fillter);
      const emaillist = [];
      const response = {};
      for (var email of result){
        var rate_data = JSON.parse(JSON.stringify(email.rate_point));
        emaillist.push(email.caretaker);
        response[email.caretaker] = {user: "" ,
        caretaker : email,
        rate_point_av : parseFloat(rate_data.sum_rate.$numberDecimal)/email.rate_point.rate_count,};
      }
      ///email.rate_point.rate_count
      // console.log(emaillist);

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
    SearchCaretaker,
    rate,
}