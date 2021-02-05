const express = require('express');
const router = express.Router();
const AuthenController = require('../controllers/Authentication');

router.post('/login', (req, res) => {
    AuthenController.login(req, res);
});

router.post('/logout', (req, res) => {
    AuthenController.logout(req, res);
});

module.exports = router;