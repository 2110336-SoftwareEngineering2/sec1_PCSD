const express = require("express");
const router = express.Router();
const ChatController = require('../controllers/Chatroom');

router.get("/", (req, res) => {
    ChatController.getAllChatrooms(req, res);
});

router.post("/", (req, res) => {
    ChatController.createChatrooms(req, res);
});

router.get("/:email", (req, res) => {
    ChatController.getUserChatrooms(req, res);
});

module.exports = router;