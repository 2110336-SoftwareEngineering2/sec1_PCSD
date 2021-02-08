const bcrypt = require("bcrypt");

const User = require("../models/User/User-model");

const Users = require("../models/User/mock_user").users;

// MongoDB email test
async function findUserByEmail(email) {
  const user = await User.findOne({ email: email });
  if (!user) {
    return null;
  } else {
    console.log(user);
    return user;
  }
}

// Mock up only, plase use MongoDB
const findUserById = (id) => {
  for (var i = 0; i < Users.length; i++) {
    if (Users[i].id == id) {
      return Users[i];
    }
  }
  return null;
};

// Mock up only, plase use MongoDB
const addUser = (user) => {
  Users.push(user);
};

// Mock up only, plase use MongoDB
const deleteUserById = (id) => {
  for (var i = 0; i < Users.length; i++) {
    if (Users[i].id == id) {
      Users.splice(i, 1);
      return;
    }
  }
};

module.exports = {
  getUser: (req, res) => {
    const allUser = User.find({}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
    // console.log(allUser);
  },

  getUserById: (req, res) => {
    const id = req.params.id;
    // Please use MongoDB
    const user = findUserById(id);
    res.json(user);
  },

  getUserByEmail: async (req, res) => {
    // const email = req.body.email;
    // Currently trying MongoDB
    const user = await findUserByEmail("user1@email.com");
    res.json(user);
  },

  registerUser: (req, res) => {
    const id = Users.length + 1; // mockup only please use uuid()
    const body = req.body;
    body["id"] = id;
    user = { id, ...body };
    // Please use MongoDB
    addUser(user);
    res.json(user);
  },

  deleteUser: (req, res) => {
    const id = req.params.id;
    // Please use MongoDB
    deleteUserById(id);
    res.json(Users);
  },

  // export function
  // findUserByEmail,
};
