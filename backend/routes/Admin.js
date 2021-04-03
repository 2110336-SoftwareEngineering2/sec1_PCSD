const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/Admin");

router.post("/login", (req, res) => {
  AdminController.login(req, res);
});

router.post("/ban", (req, res) => {
  AdminController.ban(req, res);
});

module.exports = router;
