const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const port = 1112;
const DBname = "NewDB"
const User = "NewAdmin"
const pass = "se123456"
const url = "mongodb://"+User+":"+pass+"@cluster0-shard-00-00.e28du.mongodb.net:27017,cluster0-shard-00-01.e28du.mongodb.net:27017,cluster0-shard-00-02.e28du.mongodb.net:27017/"+DBname+"?ssl=true&replicaSet=atlas-opadqx-shard-0&authSource=admin&retryWrites=true&w=majority";
var collection = "ChatBox"


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then( () => {
        console.log('Task Successfully');
        db.close();
    })
    .catch( (err) => console.log(err));

mongoose.set('useFindAndModify', false)

var db = mongoose.connection;
    
db.on("error", console.error.bind(console, "connection error:"));

const MessageSchema = Schema({
    memberID: Number,
    message: String,
    date: {type: Date,default: Date.now}
});

const ChatBoxSchema = Schema({
     memberID: [Number],
     message : [MessageSchema]
});

const ChatBox = mongoose.model('ChatBox', ChatBoxSchema, collection);
const message = mongoose.model('message', MessageSchema, collection);

// create(123456);
function create(memberID){
    // Database connection

    var createdChat = new ChatBox();
    createdChat.memberID.push(memberID)
    createdChat.save();
    id = createdChat.id;
    console.log(id);
    console.log(createdChat);
    return id;
}

function add_member(ChatBoxID,new_memberID){
    ChatBox.findOneAndUpdate(ChatBoxID,{ $push :{ 'memberID' : new_memberID}}, function (err, docs) {}); 
}

function del_Chat(ChatBoxID){
    ChatBox.findByIdAndDelete(ChatBoxID, function (err, docs) { }); 
}

function read (ChatBoxID) {
    This_chatbox = ChatBox.findById(ChatBoxID, function (err, docs) { 
        console.log(docs.message);
    }); 
}

function sent (ChatBoxID,new_message,UserID) {
    var This_Message = new message();
    This_Message.message = new_message;
    This_Message.memberID = UserID;

    ChatBox.findOneAndUpdate(ChatBoxID,{ $push :{ 'message' : This_Message}}, function (err, docs) {}); 
}

module.exports = {
    create,
    add_member,
    del_Chat,
    sent,
    read
};
