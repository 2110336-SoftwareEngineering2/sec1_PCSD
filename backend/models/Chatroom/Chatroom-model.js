const mongoose = require("mongoose");

const { Schema } = mongoose;

// Basic user schema
const chatroomSchema = new Schema({
    members: Array,
    unreadMessages : [
        {
            email: String,
            unreadMessage: Number
        }
    ],
    messages: [
        {
            email: String,
            time: Number,
            message: String
        }
    ]
});

module.exports = mongoose.model("Chatroom", chatroomSchema, "Chatrooms");

