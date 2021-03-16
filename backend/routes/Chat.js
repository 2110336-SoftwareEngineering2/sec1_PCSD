const express = require("express");
const router = express.Router();
const ChatController = require('../controllers/Chatroom');

router.get("/rooms", (req, res) => {
    ChatController.getAllChatrooms(req, res);
});

router.post("/create", (req, res) => {
    ChatController.createChatrooms(req, res);
});

router.get("/:email", (req, res) => {
    ChatController.getUserChatrooms(req, res);
});

router.get("/rooms/:id", (req, res) => {
    ChatController.getChatRoomById(req, res);
});

router.delete("/rooms/:id", (req, res) => {
    ChatController.deleteAllMessages(req, res);
});

router.post("/rooms/send", (req, res) => {
    ChatController.pushMessage(req, res);
})

module.exports = router;