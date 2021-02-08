const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");

router.get("/", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    UserController.getUser(req, res);
  } else {
    UserController.getUserByEmail(req, res);
  }
});

router.get("/:id", (req, res) => {
  UserController.getUserById(req, res);
});

router.post("/", (req, res) => {
  UserController.registerUser(req, res);
});

router.delete("/:id", (req, res) => {
  UserController.deleteUser(req, res);
});

module.exports = router;
