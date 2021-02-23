const bcrypt = require("bcrypt");

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
    return "Add user failed";
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
  const emails = User.find({}, {_id: 0, email:1} , (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(result);
    }
  })
}

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
    const email = req.params.email;
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
    res.status(result.status).send(result.message);
  },

  getAllEmails: async (req, res) => {
    await getAllUsersEmail(req, res);
  },
};
