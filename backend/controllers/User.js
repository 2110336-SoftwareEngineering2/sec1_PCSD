const bcrypt = require("bcrypt");
const auth = require("./Authentication");

const User = require("../models/User/User-model");

// Please set response status code
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return "User with this email does not exist";
  } else {
    return user;
  }
};

// Please set response status code
const findUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    return "User with this id did not exist";
  } else {
    return user;
  }
};

// Please set response status code
const addUser = async (body) => {
  const user = await User.findOne({ username: body.username });
  body.password = await bcrypt.hash(body.password, 10);
  if (!user) {
    const newUser = new User({
      ...body,
    });
    newUser.save((err) => {
      if (err) console.log(err);
    });
    return newUser;
  } else {
    throw new Error("username taken!");
  }
};

const deleteUserById = async (id) => {
  const user = await User.findById(id);
  if (user) {
    try {
      const deleteUser = await User.deleteOne({ _id: id });
      if (deleteUser === null) {
        return {
          status: 400,
          message: "Something went wrong. Cannot delete user please try again.",
        };
      } else {
        return {
          status: 200,
          message: "Delete user suceccessfully.",
        };
      }
    } catch (error) {
      const message = `Something went wrong. Got some error : ${error}`;
      return {
        status: 400,
        message: message,
      };
    }
  } else {
    message = `Cannot find user id: ${id}`;
    return {
      status: 400,
      message: message,
    };
  }
};

const getAllUsersEmail = async (req, res) => {
  const emails = User.find({}, { _id: 0, email: 1 }, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(result);
    }
  });
};

const editUser = async (req, res) => {
  const id = req.body.id;
  var user;

  if (req.body.username) {
    user = User.findOne({ username: req.body.username });
  }

  if (!user || user._id == id) {
    const editedUser = await User.findByIdAndUpdate(id, req.body);
    if(editedUser) {
      res.send("Edit successful")
    } else {
      res.status(400).send({ problem: "user not found" });
    }
  } else {
    res.status(400).send({ problem: "username taken" });
  }
};

const TopUp = async (req, res) => {
  if (user && user.role === "user") {
    const body = req.body;
    const { email } = user.email;
    const filter = { username: email };
    const update = { $inc: { balance: body.value } };

    await User.findOneAndUpdate(filter, update, (err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.status(404).send("user not found");
  }
};

const transfer = async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;
  const amount = req.body.amount;

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  
  if (!sender) {
    res.status(400).send("Sender user not found");
  } else if (!receiver) {
    res.status(400).send("Receiver user not found");
  } else {
    const sufficient = sender.balance.bytes >= amount;

    if (!sufficient) {
      res.status(400).send("Insufficient balance")
    } else {
      await User.findByIdAndUpdate(senderId, { $inc: { balance: -amount } });
      await User.findByIdAndUpdate(receiverId, { $inc: { balance: amount } });
      res.send("Transfer successfully")
    }
  }
};

module.exports = {
  TopUp,

  getUser: async (req, res) => {
    const allUser = await User.find({}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  },

  getUserById: async (req, res) => {
    const id = req.params.id;
    const user = await findUserById(id);
    res.json(user);
  },

  getUserByEmail: async (req, res) => {
    const email = req.body.email;
    const user = await findUserByEmail(email);
    res.json(user);
  },

  registerUser: async (req, res) => {
    const body = req.body;
    try {
      const user = await addUser(body);
      res.json(user);
    } catch (err) {
      res.status(400).send({ problem: err.message });
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;
    const result = await deleteUserById(id);
    res.status(result.status).send(result.message);
  },

  getAllEmails: async (req, res) => {
    await getAllUsersEmail(req, res);
  },

  getAllUsersInfo: async (req, res) => {
    const info = await User.find({}, {firstname: 1, email: 1, _id: 0});
    res.status(200).json(info);
  },

  editUser,

  transfer,
};
