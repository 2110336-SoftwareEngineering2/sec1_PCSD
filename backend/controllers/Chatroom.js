const Chatrooms = require('../models/Chatroom/Chatroom-model');

const findAllChatrooms = async (req, res) => {
    const allRooms = await Chatrooms.find({}, (err, result) => {
        if (err) {
            return res.status(404).send(err);
        } else {
            return res.status(200).json(result);
        }
    });
}

const findChatRoomById = async (req, res) => {
    if (req.params.id !== null) {
        await Chatrooms.findById(req.params.id, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            } else {
                return res.status(200).json(result);
            }
        });
    } else {
        return res.status(400).send("Request parameter :id == null");
    }

}

const findUserChatroomsByEmail = async (req, res) => {
    // send url parameters
    const email = req.params.email;
    const chatrooms = await Chatrooms.find({members: {$in:[email]} }, (err, result) => {
        if (err) {
            return res.status(404).send(err);
        } else {
            return res.status(200).json(result);
        }
    });
}

// const pushMessage = async (req, res) => {
//     const {id, message, token, email, time} = req.body;
//     const data = {
//         message: message,
//         email: email,
//         time: time
//     }
//     const result = await Chatrooms.updateOne({_id: id}, {$push: {messages: data }}, { new: true, upsert: true });
//     res.json(result);
// }

const createChatroom = (req, res) => {
    // send req.body => { members : [email_user_1, email_user_2 ] }
    const newChatRoom = new Chatrooms({ ...req.body, });
    newChatRoom.save( (err) => {
        if (err) {
            // Create char room failed
            return res.status(404).send(err);
        } else {
            return res.status(200).json(newChatRoom);
        }
    })
}

const clearMessages = async (req, res) => {
    const roomId = req.params.id;
    await Chatrooms.findOneAndUpdate({_id: roomId}, {$set: {messages: []}}, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).json(result);
        }
    }) 
}

const createMessage = async (roomId, message) => {
    const res = await Chatrooms.findByIdAndUpdate(
        {_id: roomId},
        {$push: {messages: message}},
        (err, result) => {
            if (err) return false;
            return true;
        }
    );
    return res;
}

module.exports = {
    getAllChatrooms: async (req, res) => {
        await findAllChatrooms(req, res);
    },

    createChatrooms: (req, res) => {
        createChatroom(req, res);
    },

    getUserChatrooms: async (req, res) => {
        await findUserChatroomsByEmail(req, res);
    },

    getChatRoomById: async (req, res) => {
        await findChatRoomById(req, res);
    },

    saveMessage: async (roomId, message) => {
        await createMessage(roomId, message);
    },

    deleteAllMessages: async (req, res) => {
        await clearMessages(req, res);
    },
}