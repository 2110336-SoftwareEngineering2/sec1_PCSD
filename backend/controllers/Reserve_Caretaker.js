//  Reserve Care taker is the operation when user in user role reserve and unresurve the caretaker.
const checkAuth = require("./Authentication");
const checkUser = require("./User");
const User = require("../models/User/User-model");


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
      res.status(200).send("Reserve Successful");
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

const calculatePrice = async (req, res) => {
  //req.body.starttime
  //req.body.endtime
  //req.body.rate (baht/hour)

  //Calculate Time In Hour
  //Hour * rate = Price
  return res.status(200).send("OK");
}
    
  

module.exports = {
  reserveCaretaker,
  unreserveCaretaker,
};