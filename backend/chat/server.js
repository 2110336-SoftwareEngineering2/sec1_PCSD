const socket = require('socket.io');
const jwt = require("jsonwebtoken");

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

        io.on('connection', (socket) => {
            console.log('connection seccessfully');

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('sent-message', function (data) {
                const checkToken = authToken(data.token);
                if (checkToken.status == true) {
                    io.emit('new-message-status', { status: checkToken.status, message: data.message, user: data.user });
                } else {
                    io.emit('new-message-status', { status: checkToken.status, message: checkToken.message, user: data.user });
                }
            });

        });
    },
};

module.exports = chatServer;