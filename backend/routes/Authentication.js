const express = require("express");
const router = express.Router();
const AuthenController = require("../controllers/Authentication");

// Login User
router.post("/login", (req, res) => {
  AuthenController.login(req, res);
});

// Logut User
router.post("/logout", (req, res) => {
  AuthenController.logout(req, res);
});

// Validate Token
router.post("/valid", (req, res) => {
  AuthenController.validateAccessToken(req, res);
});

module.exports = router;
