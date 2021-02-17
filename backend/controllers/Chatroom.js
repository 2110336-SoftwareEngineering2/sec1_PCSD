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

const findUserChatroomsByEmail = async (req, res) => {
    // send url parameters
    const email = req.params.email;
    const chatrooms = await Chatrooms.find({members: {$in:[email]} }, (err, result) => {
        if (err) {
            return res.status(404).send(err);
        } else {
            return res.status(200).json(result);
        }
    })
}

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

module.exports = {
    getAllChatrooms: async (req, res) => {
        await findAllChatrooms(req, res);
    },

    createChatrooms: (req, res) => {
        createChatroom(req, res);
    },

    getUserChatrooms: async (req, res) => {
        await findUserChatrooms(req, res);
    },
}