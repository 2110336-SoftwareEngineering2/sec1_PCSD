const checkAuth = require("./Authentication");

const Pet = require("../models/User/Pet-model");

module.exports = {
  addPet: (req, res) => {
    // Check if user is logged in
    checkAuth.validateAccessToken(req, res);
    const user = req.decoded;

    // user is logged in and hase "user" role
    if (user && user.role === "user") {
      const petInfo = req.body;
      const { email } = user.email;
      // create new pet
      const newPet = new Pet({ ...petInfo, owner: email });

      newPet.save((err) => {
        if (err) console.log(err);
        res.send(newPet);
      });
    }
  },
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
