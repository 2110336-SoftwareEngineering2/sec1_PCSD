const bcrypt = require("bcrypt");

const User = require("../models/User/User-model");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return "User with this email does not exist";
  } else {
    return user;
  }
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    return "User with this id did not exist";
  } else {
    return user;
  }
};

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
    return "Add user failed";
  }
};

const deleteUserById = async (id) => {
  const user = await User.findById(id);
  if (user) {
    await User.deleteOne({ _id: id });
    return "User deleted";
  } else {
    return "User not found";
  }
};

module.exports = {
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
    const user = await addUser(body);
    res.json(user);
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;
    const result = await deleteUserById(id);
    res.send(result);
  },

  // export function
  // findUserByEmail,
};
