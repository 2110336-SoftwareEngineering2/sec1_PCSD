const express = require('express');
const User = require('../controllers/User');
const router = express.Router();
const UserController = require('../controllers/User');

router.get('/', (req, res) => {
    UserController.getUser(req, res);
});

router.get('/:id', (req, res) => {
    UserController.getUserById(req, res);
});

router.post('/', (req, res) => {
    UserController.registerUser(req, res);
});

router.delete('/:id', (req, res) => {
    UserController.deleteUser(req, res);
});

module.exports = router;