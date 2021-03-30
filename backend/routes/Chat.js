const express = require("express");
const router = express.Router();
const ChatController = require('../controllers/Chatroom');
// Wait to fix ChatRoom Middleware
const UserMiddleware = require('../middlewares/Authentication').UserMiddleware;

router.get("/rooms", UserMiddleware, (req, res) => {
    ChatController.getAllChatrooms(req, res);
});

router.post("/create", UserMiddleware, (req, res) => {
    ChatController.createChatrooms(req, res);
});

router.get("/:email", UserMiddleware, (req, res) => {
    ChatController.getUserChatrooms(req, res);
});

router.get("/rooms/:id", UserMiddleware, (req, res) => {
    ChatController.getChatRoomById(req, res);
});

router.delete("/rooms/:id", UserMiddleware, (req, res) => {
    ChatController.deleteAllMessages(req, res);
});

router.post("/rooms/send", UserMiddleware, (req, res) => {
    ChatController.pushMessage(req, res);
});

router.post("/read", UserMiddleware, (req, res) => {
    ChatController.readMessage(req, res);
});

router.post("/update/unread/:id", UserMiddleware, (req, res) => {
    ChatController.updateUnreadMessage(req, res);
});

module.exports = router;