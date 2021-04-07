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

const findNotificationsByEmail = async (req, res) => {
    const user = req.params.email;
    await Notifications.findOne({user: user}, (err, result)=> {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).json(result);
        }
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