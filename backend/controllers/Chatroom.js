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

const createChatroom = (req, res) => {
    // send req.body => { members : [email_user_1, email_user_2 ] }
    var defaultUnread = [
        {
            email: req.body.members[0],
            unreadMessage: 0
        },
        {
            email: req.body.members[1],
            unreadMessage: 0
        }
    ]
    const newChatRoom = new Chatrooms({ ...req.body, unreadMessages:defaultUnread });
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

const readMessage = async (id, email) => {
    const query = {_id: id, "unreadMessages.email": email}
    const updateDoc = {
        "$set": {"unreadMessages.$.unreadMessage": 0}
    }
    try {
        await Chatrooms.updateOne(query, updateDoc);
    } catch (err) {
        console.log(err)
        return false;
    }
    return true;
}

const updateUnreadMessage = async (roomId) => {
    const query = {_id: roomId};
    const updateDoc = {
        "$inc": {"unreadMessages.$[].unreadMessage": 1}
    };
    try {
        const result = await Chatrooms.updateMany(query, updateDoc);
        return;
    } catch (err) {
        return err;
    }
}

const getUnreadMessage = async (req, res) => {
    // const query = {};
    const query = {
        "_id": req.params.id
        // "unreadMessages": {"$elemMatch": {"email": req.params.email}}
    }
    await Chatrooms.findOne(query, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            // console.log(result)
            var found = false;
            result.unreadMessages.forEach((elem) => {
                if (elem.email === req.params.email) {
                    res.status(200).json(elem);
                    found = true;
                    return;
                }
            });
            if (!found) res.status(404).send("Cannot found this email.");
        }
    });
}

const getSumUnreadMessage = async (email) => {
    const query = {
        "members": {"$in": [email]} 
    };
    const result = await Chatrooms.find(query, (err, result) => {
        if (err) {
            console.log(err);
            return null;
        } else {
            return result;
        }
    });
    // console.log(result)
    return result;
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

    readMessage: async (id, email) => {
        await readMessage(id, email);
    },

    updateUnreadMessage: async (roomId) => {
        await updateUnreadMessage(roomId);
    },

    getUnreadMessage: async (req, res) => {
        await getUnreadMessage(req, res);
    },

    // getSumUnreadMessage: (email) => {
    //     getSumUnreadMessage(email);
    // }
    getSumUnreadMessage
}