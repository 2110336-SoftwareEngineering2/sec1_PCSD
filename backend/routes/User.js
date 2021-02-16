const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");
const PetController = require("../controllers/Pet");

router.get("/", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    UserController.getUser(req, res);
  } else {
    UserController.getUserByEmail(req, res);
  }
});

router.get("/account/:id", (req, res) => {
  UserController.getUserById(req, res);
});

router.post("/", (req, res) => {
  UserController.registerUser(req, res);
});

router.delete("/account/:id", (req, res) => {
  UserController.deleteUser(req, res);
});

router.post("/pet", (req, res) => {
  PetController.addPet(req, res);
});

router.delete("/pet", (req, res) => {
  PetController.removePet(req, res);
});

module.exports = router;
