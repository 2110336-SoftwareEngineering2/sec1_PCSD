// const socket = require("socket.io");
const NotificationLibs = require("./libary");


const notificationServer = {
    listen (io) {
        // io = socket(server, {
        //     cors: "*"
        // });

        io.on("connection", async (socket) => {
            const user = socket.handshake.query.user;

            socket.join(user);

            socket.on('disconnect', () => {
                socket.leave(user);
            });

            socket.on("sent-noti", async (req) => {
                const sender = req.sender;
                const receiver = req.receiver;
                const type = req.type;
                const data = await NotificationLibs.getDataToSend(sender, receiver, type);
                if (data !== null) {
                    const currentUnread = await NotificationLibs.saveNotifications(receiver, data);
                    // console.log(currentUnread)
                    io.to(receiver).emit("new-noti", data);
                    io.to(receiver).emit("new-unread-noti", currentUnread);
                } else {
                    io.to(receiver).emit("exception", {err: "Something went wrong"});
                }
            });

            socket.on("read", async (req) => {
                const user = req.user;
                const value = 0;
                const result = await NotificationLibs.updateUnreadNotifications(user, value);
                // console.log(result)
                if (result !== null) {
                    io.to(user).emit("new-unread-noti", 0);
                } else {
                    io.to(user).emit("exception", {err: "Something went wrong"});
                }
            })
        });
    }
}

module.exports = notificationServer