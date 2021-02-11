const socket = require('socket.io');

const chatServer = {
    listen (server) {
        io = socket(server, {
            cors: '*'
        });

        io.on('connection', (socket) => {
            console.log('a user connected');

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('sent-message', function (message) {
                io.emit('new-message', message)
            });

        });
    },
};

module.exports = chatServer;