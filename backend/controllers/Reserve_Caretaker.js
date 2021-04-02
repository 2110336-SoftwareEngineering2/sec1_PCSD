//  Reserve Care taker is the operation when user in user role reserve and unresurve the caretaker.
const checkAuth = require("./Authentication");
const checkUser = require("./User");
const User = require("../models/User/User-model");
const Reserve = require("../models/User/Reserve-model");


//IF role=="user" find caretaker by id --> reserved ? ;  reserve = 1: out(reserved)?
const reserveCaretaker = async (req, res , id) => {
  // Check if user is logged in
  const user = checkAuth.authToken(req, res);
  const problem = user.nullToken | user.tokenError;
      // user is logged in and has "user" role
  if (!problem && user.role === "user") {
    const petInfo = req.body;
    const email = user.email;
    //Find User by email and reserve
    caretaker = checkUser.findUserById(id);
    //Check if user is caretaker and not reserved;
    if(caretaker.role === "caretaker" && caretaker.reserved === "False"){
      //Update that caretaker's caretaker.reserved to "True"
      await caretaker.updateOne({reserved:"True"}, body);
      res.status(200).send(caretaker);
      //res.status(200).send("Reserve Successful");
    }
    }
    };
    
    // UnReserve Caretaker is the function when user logged in is caretaker and what to unreserve themself.
const unreserveCaretaker = async (req, res) => {
// Check if user is logged in
const user = checkAuth.authToken(req, res);
const problem = user.nullToken | user.tokenError;
// if user is logged in and has a "caretaker" role
if (!problem && user.role === "caretaker") {
  //Unreserve themselves
  //Change reserved to "False"
  await user.updateOne({reserved:"False"}, body);
  res.status(200).send("Unreserve Successful");
 }
};

//not used
const calculatePrice = async (req, res) => {
  //req.body.starttime
  //req.body.endtime
  //req.body.rate (baht/hour)

  //Calculate Time In Hour
  //Hour * rate = Price
  const startDate = res.body.startDate;
  const endDate = res.body.endDate;

  return res.status(200).send("OK");
};
    
const calculateHour = async (req, res) => {
  return res.status(200).send("OK");
};

const getReservedPet = async (req, res) => {
  let numReservedPet = 0;
  const pets = req.body.pets;
  //var myArray = ['1','2',3,4]

  res.setHeader('Content-Type', 'text/plain');
  pets.forEach(function(value){
    //console.log(value);
    if(value.checked === "True" || value.checked === true ) {
      res.write(value);
      numReservedPet += 1;
    }
  });
  if (numReservedPet === 0){
    res.status(204).end("No Content");
  } else {
  res.status(200).end();
  }
};

module.exports = {
  reserveCaretaker,
  unreserveCaretaker,
  calculatePrice,
  calculateHour,
  getReservedPet,
};