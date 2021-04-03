//  Reserve Care taker is the operation when user in user role reserve and unresurve the caretaker.
const checkAuth = require("./Authentication");
const Caretaker = require("../models/User/Caretaker-model");
const checkUser = require("./User");
const User = require("../models/User/User-model");
const Reserve = require("../models/User/Reserve-model");

const dateStringToTimeStamp = (date) => {
  var x = date.replace(' ', 'T');
  x += ':00Z';
  var d = new Date(x);
  return d.getTime();
}

const getReserveByEmail = async (req, res) => {
  const email = req.params.email;
  await Reserve.find({"$or": [{caretaker: email}, {petowner: email}]}, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(result);
    }
  });
}

//IF role=="user" find caretaker by id --> reserved ? ;  reserve = 1: out(reserved)?
const reserveCaretaker = async (req, res) => {
  // Check if user is logged in
  // const user = checkAuth.authToken(req, res);
  // const problem = user.nullToken | user.tokenError;
      // user is logged in and has "user" role
  // if (!problem && user.role === "user") {
    // const petInfo = req.body;
  const startDate = dateStringToTimeStamp(req.body.startDate);
  const endDate = dateStringToTimeStamp(req.body.endDate);
  const rate = req.body.rate;
  const hours = (endDate - startDate) / (1000*3600);
  const amount = rate * hours;

  // console.log(req.body)
  var data = {
    petowner: req.body.petowner,
    caretaker:req.body.caretaker, // email
    startDate: startDate,
    endDate: endDate,
    rate : req.body.rate,
    service :req.body.service,
    status :req.body.status,
    pets :req.body.pets,
    amount: amount
  }

  //Find User by email and reserve
  // caretaker = checkUser.findUserById(id);
  const caretakerInfo = await Caretaker.findOne({caretaker:req.body.caretaker});
  if (caretakerInfo.reserved === 'false') {
    // Caretaker.updateOne({caretaker: data.caretaker}, {reserved: 'true'});
    const newReserve = new Reserve(data);
    newReserve.save((err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(newReserve);
      }
    })
  } else {
    res.status(400).send("Caretaker has been reserved.");
  }
  // console.log(caretakerInfo)
  // const result = await
  // console.log()
  // res.json(data)
    //Check if user is caretaker and not reserved;
    // if(caretaker.role === "caretaker" && caretaker.reserved === "False"){
    //   //Update that caretaker's caretaker.reserved to "True"
    //   await caretaker.updateOne({reserved:"True"}, body);
    //   res.status(200).send(caretaker);
    //   //res.status(200).send("Reserve Successful");
    // }
  // }
};

const removeReserveCaretaker = async (req, res) => {
  // Check if user is logged in
  const user = checkAuth.authToken(req, res);
  const problem = user.nullToken | user.tokenError;

  //const startDate = dateStringToTimeStamp(req.body.startDate);
  //const endDate = dateStringToTimeStamp(req.body.endDate);
  //const rate = req.body.rate;
  //const hours = (endDate - startDate) / (1000*3600);
  //const amount = rate * hours;
    
  if (!problem && user.role === "user") {
    const reserveId = req.params.id;
    //const email = user.email;
    // remove reserve
    await Reserve.findOneAndDelete(
      {
        _id: reserveId,
        //owner: email
        //service: req.body.service,
        //caretaker: req.body.caretaker,
        //petowner: req.body.petowner,
        //startDate: startDate,
        //endDate: endDate,
        //status: req.body.status,
        //rate: req.body.rate,
        //amount: amount,
        //pets: [],
      },
      (err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send("Remove reserve successful");
        }
      }
    );
  }
  };




     
    // UnReserve Caretaker is the function when user logged in is caretaker and what to unreserve themself.
// const unreserveCaretaker = async (req, res) => {
// // Check if user is logged in
// const user = checkAuth.authToken(req, res);
// const problem = user.nullToken | user.tokenError;
// // if user is logged in and has a "caretaker" role
// if (!problem && user.role === "caretaker") {
//   //Unreserve themselves
//   //Change reserved to "False"
//   await user.updateOne({reserved:"False"}, body);
//   res.status(200).send("Unreserve Successful");
//  }
// };

//not used
// const calculatePrice = async (req, res) => {
//   //req.body.starttime
//   //req.body.endtime
//   //req.body.rate (baht/hour)

//   //Calculate Time In Hour
//   //Hour * rate = Price
//   const startDate = res.body.startDate;
//   const endDate = res.body.endDate;

//   return res.status(200).send("OK");
// };
    
// const calculateHour = async (req, res) => {
//   return res.status(200).send("OK");
// };

// const getReservedPet = async (req, res) => {
//   let numReservedPet = 0;
//   const pets = req.body.pets;
//   //var myArray = ['1','2',3,4]

//   pets.forEach(function(value){
//     //console.log(value);
//     if(value.checked === "True" || value.checked === true ) {
//       res.write(value);
//       numReservedPet += 1;
//     }
//   });
//   if (numReservedPet === 0){
//     res.status(404).end();
//   } else {
//   res.status(200).end();
//   }
// };

module.exports = {
  reserveCaretaker: async (req, res) => {
    await reserveCaretaker(req, res);
  },
  getReserveByEmail: async (req, res) => {
    await getReserveByEmail(req, res);
  },
  removeReserveCaretaker: async (req, res) => {
    await removeReserveCaretaker(req, res);
  }
  // reserveCaretaker,
  // unreserveCaretaker,
  // calculatePrice,
  // calculateHour,
  // getReservedPet,
};