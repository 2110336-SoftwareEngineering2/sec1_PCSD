const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");
const PetController = require("../controllers/Pet");

router.get("/", (req, res) => {
  UserController.getUser(req, res);
});

router.post("/", (req, res) => {
  UserController.getUserByEmail(req, res);
});

router.get("/emails", (req, res) => {
  UserController.getAllEmails(req, res);
});

router.get("/:email", (req, res) => {
  UserController.getUserByEmail(req, res);
});

router.get("/account/:id", (req, res) => {
  UserController.getUserById(req, res);
});

router.post("/register", (req, res) => {
  UserController.registerUser(req, res);
});

router.delete("/account/:id", (req, res) => {
  UserController.deleteUser(req, res);
});

router.get("/pet", (req, res) => {
  PetController.getPet(req, res);
});

router.post("/pet", (req, res) => {
  PetController.addPet(req, res);
});

router.delete("/pet", (req, res) => {
  PetController.removePet(req, res);
});

module.exports = router;
