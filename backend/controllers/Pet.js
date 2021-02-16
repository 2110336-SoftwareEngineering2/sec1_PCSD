const checkAuth = require("./Authentication");

const Pet = require("../models/User/Pet-model");

module.exports = {
  addPet: (req, res) => {
    checkAuth.validateAccessToken(req, res);

    if (req.decoded && req.decoded.role === "user") {
      const petInfo = req.body;
      const petOwner = req.decoded.email;
      const newPet = new Pet({ ...petInfo, owner: petOwner.email });

      newPet.save((err) => {
        if (err) console.log(err);
        res.send(newPet);
      });
    }
  },
};
