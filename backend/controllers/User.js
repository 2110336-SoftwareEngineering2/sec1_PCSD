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

const addUser = async (body, res) => {
  const user = await User.findOne({
    $or: [{ username: body.username }, { email: body.email }],
  });
  body.password = await bcrypt.hash(body.password, 10);
  if (!user) {
    const newUser = new User({
      ...body,
    });
    newUser.save((err) => {
      if (err) console.log(err);
    });
    return newUser;
  } else if (user.username === body.username) {
    res.status(400).send({ usernameError: "Username taken" });
    // throw new Error("username taken!");
  } else {
    res.status(400).send({ emailError: "Email taken" });
    // throw new Error("email taken!");
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
      res.status(400).send(err);
    } else {
      res.status(200).json(result);
    }
  });
};

const editUser = async (req, res) => {
  const id = req.body.id;
  var user;

  if (req.body.username) {
    user = await User.findOne({ username: req.body.username });
  }

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  if (!user || user._id == id) {
    var editedUser = await User.findByIdAndUpdate(id, req.body);
    if (editedUser) {
      editedUser = await User.findById(id);
      res.send(editedUser);
    } else {
      res.status(400).send({ userError: true });
    }
  } else {
    res.status(400).send({ usernameError: true });
  }
};

const TopUp = async (req, res) => {
  // Check if user is logged in
  const user = auth.authToken(req, res);
  const problem = user.nullToken | user.tokenError;

  if (!problem && user.role === "user") {
    const body = req.body;
    const { email } = user.email;
    const filter = { username: email };
    const update = { $inc: { balance: body.value } };

    await User.findOneAndUpdate(filter, update, { new: true }).exec(
      (err, result) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.status(404).send("user not found");
  }
};

const transfer = async (req, res) => {
  const senderName = req.body.senderName;
  const receiverName = req.body.receiverName;
  const amount = req.body.amount;

  const sender = await User.findOne({ username: senderName });
  const receiver = await User.findOne({ username: receiverName });

  if (!sender) {
    res.status(400).send({ senderError: true });
  } else if (!receiver) {
    res.status(400).send({ receiverError: true });
  } else {
    const sufficient = sender.balance.bytes - amount >= 0;

    if (!sufficient) {
      res.status(400).send({ balanceError: true });
    } else {
      const newSender = await User.findOneAndUpdate(
        { username: senderName },
        { $inc: { balance: -amount } },
        { new: true }
      );
      const newReceiver = await User.findOneAndUpdate(
        { username: receiverName },
        { $inc: { balance: amount } },
        { new: true }
      );
      res.send({
        senderBalance: newSender.balance.bytes,
        receiverBalance: newReceiver.balance.bytes,
      });
    }
  }
};

module.exports = {
  TopUp,

  getUser: async (_, res) => {
    await User.find({}).exec(function (err, result) {
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
    // try {
    const user = await addUser(body, res);
    if (user) res.json(user);
    // } catch (err) {
    // res.status(400).send({ problem: err.message });
    // }
  },

  deleteUser: async (req, res) => {
    const id = req.body.id;
    const result = await deleteUserById(id);
    res.status(result.status).send(result.message);
  },

  getAllEmails: async (req, res) => {
    await getAllUsersEmail(req, res);
  },

  getAllUsersInfo: async (req, res) => {
    const info = await User.find({}, { firstname: 1, email: 1, _id: 0 });
    res.status(200).json(info);
  },

  editUser,

  transfer,
};
