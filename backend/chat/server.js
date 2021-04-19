// const socket = require('socket.io');
const jwt = require("jsonwebtoken");
const ChatController = require('../controllers/Chatroom');
const Chatrooms = require('../models/Chatroom/Chatroom-model');

const authToken = (token) => {
  if (token == null || token == undefined) {
    return {
        status: false,
        message: "Authorization failed, please login again."
    }
  }
  // decoded is decoded data; In this case is an email.
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return {
          status: false,
          message: "Token has expired, please login again"
      };
    }
    return {
        status: true,
        message: "Authorization successully"
    };
  });
};

const getTotalUnread = async (email) => {
    const result = await ChatController.getSumUnreadMessage(email);
    var sum = 0;
    result.forEach(elem => {
        elem.unreadMessages.forEach(x => {
            if (x.email === email) {
                sum += x.unreadMessage
            }
        });
    })
    return sum;
}

const chatServer = {
    listen (io) {

        io.on('connection', async (socket) => {
            const room = socket.handshake.query.room;
            // console.log(`connect to room : ${room}`);

            socket.join(room);

            socket.on('disconnect', () => {
                // console.log('user disconnected');
                socket.leave(room);
            });

            socket.on('sent-message', async (data) => {
                const checkToken = authToken(data.token);
                const message = {
                    email: data.email,
                    time: data.time,
                    message: data.message,
                }
                var unreadMessage = data.unreadMessage;
                var receiver = data.receiver;
                if (checkToken.status == true) {
                    try {
                        const res = await Chatrooms.findOneAndUpdate({_id: room}, {$push: {messages: message}}, { "new": true, "upsert": true });
                        const err = await ChatController.updateUnreadMessage(room, receiver);
                        if (err) throw err;
                        io.to(room).emit('new-message-status', { status: checkToken.status, message: data.message, user: data.user, email: data.email, time: data.time});
                        const sum = await getTotalUnread(receiver);
                        io.to(receiver).emit('get-sum-unread', {sum : sum});
                        // io.to(room).emit('new-unread-message', {unreadMessage: unreadMessage});
                    } catch (err) {
                        io.to(room).emit('exception', { errMessage: err });
                    }
                } else {
                    io.to(room).emit('new-message-status', { status: checkToken.status, message: checkToken.message, user: data.user, email: data.email, time: data.time });
                }
            });

            socket.on('update-unread-message', async (data) => {
                const checkToken = authToken(data.token);
                const unreadMessage = data.unreadMessage;
                const email = data.email;
                io.to(room).emit('new-unread-message', {unreadMessage: unreadMessage, email: email});
            })

            socket.on('read', async (data) => {
                const checkToken = authToken(data.token);
                const id = data.id;
                const email = data.email;
                // console.log(id + " " + email)
                try {
                    const check = await ChatController.readMessage(id, email);
                    const sum = await getTotalUnread(email);
                    io.to(room).emit('new-unread-message', {unreadMessage: 0, email: email});
                    io.to(email).emit('get-sum-unread', {sum: sum});
                } catch (err) {
                    io.to(room).emit('exception', { errMessage: 'Read socket error.'});
                }
            });

            socket.on('get-sum-unread', async (email) => {
                const sum = await getTotalUnread(email);
                io.to(room).emit('get-sum-unread', {sum: sum});
            });

        });
    },
};

module.exports = chatServer;