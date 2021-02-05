const Users = require('../models/User/mock_user').users;
const UserController = require('./User');

// Please use hash password
const validEmailAndPassword = (email, password) => {
    const user = UserController.findUserByEmail(email);
    if (user == null) {
        return false;
    } else {
        if (user.password == password) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = {
    // test
    login: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const val = validEmailAndPassword(email, password);
        res.send(val);
    },

    // test
    logout: (req, res) => {
        res.send("logout");
    },
}