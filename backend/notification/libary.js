const UserModel = require("../models/User/User-model");
const Notifications = require("../models/Notification/Notification-model");

const getUserData = async (email) => {
    const user = await UserModel.findOne({email: email}, (err, result) => {
        if (err) {
            return null;
        } else {
            return result;
        }
    })
    if (user !== null) {
        return {
            email: user.email,
            fname: user.firstname,
            lname: user.lastname
        }
    } else {
        return null;
    }
}

const getDetail = (sender, type) => {
    switch (type) {
        case "RESERVE":
            return `${sender.fname} ${sender.lname} has reserved you.`;
        case "CANCEL":
            return `${sender.fname} ${sender.lname} has canceled the reservation.`;
        case "ACCEPT":
            return `${sender.fname} ${sender.lname} has accepted your reservation.`;
        case "DONE":
            return `Caretaker, ${sender.fname} ${sender.lname}, has already done the jobs.`
    }
}

const getDataToSend = async (sender, receiver, type) => {
    const senderData = await getUserData(sender);
    const receiverData = await getUserData(receiver);
    const detail = getDetail(senderData, type);
    if (senderData !== null && receiverData !== null) {
        return {
            sender: senderData,
            receiver: receiverData,
            title: type,
            detail: detail,
            timestamp: Date.now()
        }
    } else {
        return null;
    }
}

const saveNotifications = async (user, notification) => {
    // return
    const userNotification = await Notifications.findOne({user: user}, (err, result) => {
        if (err) {
            return null;
        } else {
            return result;
        }
    });
    if (userNotification === null) {
        var newModel = new Notifications({
            user: user,
            notifications: [
                notification
            ],
            unreadNotifications: 1
        });
        newModel.save((err) => {
            if (err) {
                console.log(err);
            }
        });
        return 1;
    } else {
        const result = await Notifications.findOneAndUpdate({user: user}, {$push: {notifications: notification}});
        const tmp = await increaseUnreadNotifications(user);
        var currentUnread = result.unreadNotifications + 1;
        // console.log("from save")
        // console.log(result);
        // console.log(tmp)
        // console.log(currentUnread)
        return currentUnread;
    }
}

const updateUnreadNotifications = async (user, value) => {
    console.log(user)
    const res = await Notifications.updateOne({user: user}, {$set: {unreadNotifications: value}});
    return res;
}

const increaseUnreadNotifications = async (user) => {
    // awa
    const result = await Notifications.findOneAndUpdate({user: user}, {$inc: {"unreadNotifications": 1}});
    return result;
}
module.exports = {
    getDataToSend,
    saveNotifications,
    updateUnreadNotifications,
    increaseUnreadNotifications
}