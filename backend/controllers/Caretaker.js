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

const comment = async (body,res) =>{
  await Caretaker.updateOne({caretaker:body.email}, 
    { $push: {comment : {
        email: body.email,
        text: body.comment}
      }
    });
  res.send("comment successful");
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

const rate_av = function(rate_point){
  if(rate_point.rate_count==0) return -1;
  var rate_data = JSON.parse(JSON.stringify(rate_point));
  return parseFloat(rate_data.sum_rate.$numberDecimal)/rate_point.rate_count;
}

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
  if (body.date){
    var start_date = new Date(body.date.start);
    var end_date = new Date(body.date.end);
    let diff_in_week = Math.min(7,(end_date-start_date)/(86400000)+1); //24*60*60*1000
    const week =  ['sun','mon','tue','wed','thu','fri','sat'];
    var result = [];
    let start_date_in_week = start_date.getDay();

    for (i = 0; i < diff_in_week; i++) {
      result.push(week[(start_date_in_week+i)%7])
    }
    // console.log(result)
    fillter.available_day = { $all : result };
  }

  await Caretaker.find(fillter, '-_id caretaker rate city province country description rate_point available_day', (err, result) => {
    if (err) {
      res.status(400).send("not found");
    } else {
      // res.status(200).json(result);
      // console.log(fillter);
      const emaillist = [];
      const response = {};

      result.sort(function(a,b){
          // console.log(rate_av(a.rate_point));
          return rate_av(b.rate_point)-rate_av(a.rate_point);
        });

      for (var email of result){
        emaillist.push(email.caretaker);
        response[email.caretaker] = {user: "" ,
        caretaker : email,
        rate_point_av : rate_av(email.rate_point),};
        // console.log(email.caretaker,rate_av(email.rate_point));
      }
      // emaillist.sort(function(a,b){
      //   console.log();
      //   return a.rate_point_av-b.rate_point_av
      // });
      
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
    comment,
}