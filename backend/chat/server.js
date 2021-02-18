const socket = require('socket.io');
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

const chatServer = {
    listen (server) {
        io = socket(server, {
            cors: '*'
        });

        io.on('connection', async (socket) => {
            console.log('connection seccessfully');
            const room = socket.handshake.query.room;
            console.log(room)

            socket.join(room, () => {
                console.log(`join in room : ${room}`);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('sent-message', async (data) => {
                const checkToken = authToken(data.token);
                const message = {
                    email: data.email,
                    time: data.time,
                    message: data.message
                }
                console.log(message)
                if (checkToken.status == true) {
                    const res = await Chatrooms.findOneAndUpdate({_id: room}, {$push: {messages: message}}, (err, result)=> {
                        if (err) console.log(err)
                    })
                    io.to(room).emit('new-message-status', { status: checkToken.status, message: data.message, user: data.user, email: data.email });
                    
                } else {
                    io.to(room).emit('new-message-status', { status: checkToken.status, message: checkToken.message, user: data.user, email: data.email });
                }
            });

        });
    },
};

module.exports = chatServer;