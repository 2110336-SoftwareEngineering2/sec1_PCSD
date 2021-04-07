const express = require("express");
const router = express.Router()
const Notifications = require("../controllers/Notification");

router.get("/:email", (req, res) => {
    Notifications.getNotificationsByEmail(req, res);
});

router.delete("/delete/:email", (req, res) => {
    Notifications.deletAllNotificationsByEmail(req,res);
});

module.exports = router;