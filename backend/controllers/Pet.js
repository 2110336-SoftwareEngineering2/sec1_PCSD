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
      const email = user.email;
      // create new pet
      const newPet = new Pet({ ...petInfo, owner: email });
      if (petInfo.hasImg) {
        newPet.imgURL =
          "https://pcsdimage.s3-us-west-1.amazonaws.com/" + newPet._id;
      }

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
      const email = user.email;
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
      const email = user.email;
      // find pet
      Pet.find({ owner: email }, (err, docs) => {
        if (err) {
          res.send(err);
        } else {
          res.send(docs);
        }
      });
    }
  },
  editPet: (req, res) => {
    // Check if user is logged in
    const user = checkAuth.authToken(req, res);
    const problem = user.nullToken | user.tokenError;
    // user is logged in and has "user" role
    if (!problem && user.role === "user") {
      // find and update pet
      if (req.body.hasImg) {
        req.body.imgURL =
          "https://pcsdimage.s3-us-west-1.amazonaws.com/" + req.body._id;
      }

      Pet.findByIdAndUpdate(req.body._id, req.body, (err, docs) => {
        if (err) {
          res.send(err);
        } else {
          res.send(docs);
        }
      });
    }
  },
  deleteAllPet: async (owner) => {
    await Pet.deleteMany({ owner: owner });
  },
};
