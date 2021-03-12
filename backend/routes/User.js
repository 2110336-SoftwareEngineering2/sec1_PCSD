const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");
const PetController = require("../controllers/Pet");

// For testing, currently unused
router.get("/", (req, res) => {
  UserController.getUser(req, res);
});

// For testing, currently unused
router.post("/", (req, res) => {
  UserController.getUserByEmail(req, res);
});

// For testing, currently unused
router.get("/emails", (req, res) => {
  UserController.getAllEmails(req, res);
});

// For testing, currently unused
router.post("/email", (req, res) => {
  UserController.getUserByEmail(req, res);
});

// For testing, currently unused
router.get("/account/:id", (req, res) => {
  UserController.getUserById(req, res);
});

router.post("/register", (req, res) => {
  UserController.registerUser(req, res);
});

// For testing, currently unused
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

router.post("/edit", (req, res) => {
  UserController.editUser(req,res);
})
router.post("/topup", (req, res) => {
  UserController.TopUp(req,res);
});

module.exports = router;
