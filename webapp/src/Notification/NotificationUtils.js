const sentNotification = async (socket, sender, receiver, type) => {
    socket.emit("sent-noti", {sender: sender, receiver: receiver, type: type})
}

export {
    sentNotification
}