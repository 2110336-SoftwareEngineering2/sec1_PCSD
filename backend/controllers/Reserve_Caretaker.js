//  Reserve Care taker is the operation when user in user role reserve and unresurve the caretaker.
const checkAuth = require("./Authentication");
const checkUser = require("./User");


const User = require("../models/User/User-model");

module.exports = {
    //IF role=="user" find caretaker by id --> reserved ? ;  reserve = 1: out(reserved)?
    reserveCaretaker: (req, res , id) => {
      // Check if user is logged in
      checkAuth.validateAccessToken(req, res);
      const user = req.decoded;
  
      // user is logged in and has "user" role
      if (user && user.role === "user") {
        const petInfo = req.body;
        const { email } = user.email;
        
        //Find User by email and reserve
        caretaker = checkUser.findUserById(id);

        //Check if user is caretaker and not reserved;
        if(caretaker.role === "caretaker" && caretaker.reserved === "False"){
            //Update that caretaker's caretaker.reserved to "True"
            await caretaker.updateOne({reserved:"True"}, body);

        }
        
        newPet.save((err) => {
          if (err) console.log(err);
          res.send(newPet);
        });
      }
    },
    // UnReserve Caretaker is the function when user logged in is caretaker and what to unreserve themself.
    unreserveCaretaker: async (req, res) => {
      // Check if user is logged in
      checkAuth.validateAccessToken(req, res);
      const user = req.decoded;
      // if user is logged in and has a "caretaker" role
      if (user && user.role === "caretaker") {
        

      //Unreserve themselves
      
        
        
      }
    },
    getPet: async (req, res) => {
      const pets = await Pet.find();
      return pets;
    },
  };
  