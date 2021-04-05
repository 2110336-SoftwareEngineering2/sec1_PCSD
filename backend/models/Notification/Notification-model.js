const mongoose = require("mongoose");

const { Schema } = mongoose;

const NotificationSchema = new Schema({
    user: String,
    notifications: [
        // {
        //     sender: {
        //         email: String,
        //         fname: String,
        //         lname: String
        //     },
        //     receiver: {
        //         email: String,
        //         fname: String,
        //         lname: String
        //     },
        //     title: String,
        //     detail: String,
        //     timestamp: Number
        // }
    ],
    unreadNotifications: Number,
});

module.exports = mongoose.model("Notification", NotificationSchema, "Notifications");