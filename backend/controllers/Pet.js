const checkAuth = require("./Authentication");

const Pet = require("../models/User/Pet-model");

module.exports = {
  addPet: (req, res) => {
    // Check if user is logged in
    const user = checkAuth.authToken(req, res);
    const problem = user.nullToken | user.tokenError;

    // user is logged in and has "user" role
    if (!problem && user.role === "user") {
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
    const user = checkAuth.authToken(req, res);
    const problem = user.nullToken | user.tokenError;

    // user is logged in and has "user" role
    if (!problem && user.role === "user") {
      const petId = req.body.source;
      const { email } = user.email;
      // remove pet
      await Pet.findOneAndDelete(
        {
          _id: petId,
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
  getPet: (req, res) => {
    // Check if user is logged in
    const user = checkAuth.authToken(req, res);
    const problem = user.nullToken | user.tokenError;

    // user is logged in and has "user" role
    if (!problem && user.role === "user") {
      const { email } = user.email;
      // find pet
      Pet.find({ owner: email },
        (err, docs) => {
          if (err) {
            res.send(err);
          } else {
            res.send(docs);
          }
        }
      );
    }
  },
};
