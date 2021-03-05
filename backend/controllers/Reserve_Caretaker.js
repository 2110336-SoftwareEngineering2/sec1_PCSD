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
        // create new pet
        //const newPet = new Pet({ ...petInfo, owner: email });
        //Find User by email and reserve
        caretaker = checkUser.findUserById(id);
        
        newPet.save((err) => {
          if (err) console.log(err);
          res.send(newPet);
        });
      }
    },
    // UnReserve Caretaker is the function when user logged in is caretaker and what to unreserve themself.
    removePet: async (req, res) => {
      // Check if user is logged in
      checkAuth.validateAccessToken(req, res);
      const user = req.decoded;
  
      // user is logged in and has "user" role
      if (user && user.role === "user") {
        const petName = req.body.petName;
        const { email } = user.email;
        // remove pet
        await Pet.findOneAndDelete(
          {
            petName: petName,
            owner: email,
          },
          (err) => {
            if (err) {
              res.send(err);
            } else {
              res.send("Remove pet successful");
            }
          }
        );
      }
    },
    getPet: async (req, res) => {
      const pets = await Pet.find();
      return pets;
    },
  };
  