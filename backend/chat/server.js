const io = require('socket.io');

const chatServer = {
    listen (server) {
        chat = io(server, {
            cors: '*'
        });

        chat.on('connection', (client) => {
            console.log('a user connected');

            client.on('disconnect', () => {
                console.log('user disconnected');
            });

            client.on('sent-message', function (message) {
                io.sockets.emit('new-message', message)
            })

        });
    },
};

module.exports = chatServer;