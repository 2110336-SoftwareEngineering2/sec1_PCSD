const Notifications = require("../models/Notification/Notification-model");

// const findNotificationById = async (req, res) => {
//     const id = req.params.id;
//     await Notifications.find({_id: id}, (err, result) => {
//         if (err) {
//             res.status(404).send("Cannot find this id");
//         } else {
//             res.status(200).json(result);
//         }
//     })
// }

function compare(a, b ) {
  if ( a.last_nom < b.last_nom ){
    return -1;
  }
  if ( a.last_nom > b.last_nom ){
    return 1;
  }
  return 0;
}

const findNotificationsByEmail = async (req, res) => {
    const user = req.params.email;

    const notification = await Notifications.findOne({user: user});
    const unread = notification.unreadNotifications;
    var n = 0;
    if (unread < 3) {
        n = 3;
    } else {
        n = unread;
    }
    var result = notification.notifications;
    result.sort((a, b) => {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
    });
    res.json({
        unreadNotifications: unread,
        notifications: result.slice(0, n)
    });
}

const deleteNotifications = async (req, res) => {
    const user = req.params.email;
    await Notifications.deleteMany({user: user}, (err, result)=> {
        if (err) {
            res.status(400).send("Deletion error");
        } else {
            res.status(200).json(result);
        }
    });
}

// Socket function
// const saveNotification = async (notification) => {
    
// }

module.exports = {
    getNotificationsById: async (req, res) => {
        await findNotificationById(req, res);
    },

    deletAllNotificationsByEmail: async (req, res) => {
        await deleteNotifications(req,res);
    },

    getNotificationsByEmail: async (req, res) => {
        await findNotificationsByEmail(req, res);
    }

}