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

const deleteChatroomById = async (req, res) => {
    const id = req.params.id;
    await Chatrooms.findOneAndDelete({_id: id}, (err, result) => {
        if (err) {
            res.status(404).send({err: err});
        } else {
            res.status(200).json(result);
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

const findChatRoomByMembers = async (req, res) => {
    const members = req.query.members;
    const chatroom = await Chatrooms.findOne({$or: [{members: [members[0], members[1]]}, {members: [members[1], members[0]]}]}, (err, result) => {
        if (err) {
            return null;
        } else {
            return result;
        }
    });
    if (chatroom === null) {
        res.status(404).send({err: "Cannot find chatrooms"});
    } else {
        res.status(200).json(chatroom);
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

const createChatroom = async (req, res) => {
    // send req.body => { members : [email_user_1, email_user_2 ] }
    const members = req.body.members;
    const chatroom = await Chatrooms.findOne({$or: [{members: [members[0], members[1]]}, {members: [members[1], members[0]]}]}, (err, result) => {
        if (err) {
            return null;
        } else {
            return result;
        }
    });
    var defaultUnread = [
        {
            email: req.body.members[0],
            unreadMessage: 0
        },
        {
            email: req.body.members[1],
            unreadMessage: 0
        }
    ];
    if (chatroom === null) {
        const newChatRoom = new Chatrooms({ ...req.body, unreadMessages:defaultUnread });
        newChatRoom.save( (err) => {
            if (err) {
                // Create char room failed
                return res.status(404).send(err);
            } else {
                return res.status(200).json(newChatRoom);
            }
        });
    } else {
        return res.status(400).send({err: "This room has been created."});
    }
   
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
            res.status(400).send(err);
        } else {
            // console.log(result)
            var found = null;
            // var found  = result.unreadMessages.forEach((elem) => {
            //     if (elem.email === req.params.email) {
            //         // console.log(elem)
            //         return elem;
            //     }
            // });
            for (var i=0; i<(result.unreadMessages).length; i++) {
                if ((result.unreadMessages)[i].email === req.params.email) {
                    found = (result.unreadMessages)[i];
                    break;
                }
            }
            if (found === null) {
                res.status(404).send("Cannot found this email");
            } else {
                // console.log(found)
                res.status(200).json(found);
            }
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

    getChatRoomByMembers: async (req, res) => {
        await findChatRoomByMembers(req, res);
    },

    deleteChatroomById: async (req, res) => {
        await deleteChatroomById(req, res);
    },

    // getSumUnreadMessage: (email) => {
    //     getSumUnreadMessage(email);
    // }
    getSumUnreadMessage
}