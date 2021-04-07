const express = require("express");
const router = express.Router();
const ChatController = require('../controllers/Chatroom');
// Wait to fix ChatRoom Middleware
const UserMiddleware = require('../middlewares/Authentication').UserMiddleware;

router.get("/rooms", UserMiddleware, (req, res) => {
    console.log(req.query.members)
    if (req.query.members === undefined || (req.query.members).length === 1) {
        ChatController.getAllChatrooms(req, res);
    } else {
        ChatController.getChatRoomByMembers(req, res);
    }
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

router.delete("/rooms/clear/:id", UserMiddleware, (req, res) => {
    ChatController.deleteAllMessages(req, res);
});

router.delete("rooms/:id", UserMiddleware, (req,res) => {
    ChatController.deleteChatroomById(req, res);
})

router.post("/rooms/send", UserMiddleware, (req, res) => {
    ChatController.pushMessage(req, res);
});

router.post("/read", UserMiddleware, (req, res) => {
    ChatController.readMessage(req, res);
});

// router.post("/update/unread/:id", UserMiddleware, (req, res) => {
//     ChatController.updateUnreadMessage(req, res);
// });
router.get("/rooms/unread/:id/:email", UserMiddleware, (req, res) => {
    ChatController.getUnreadMessage(req, res);
})

module.exports = router;