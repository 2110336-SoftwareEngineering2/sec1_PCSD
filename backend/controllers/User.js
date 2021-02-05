const Users = require('../models/User/mock_user').users;

// Mock up only, plase use MongoDB
const findUserByEmail = (email) => {
    for (var i=0; i < Users.length; i++) {
        if (Users[i].email == email) {
            return Users[i];
        }
    }
    return null;
}

// Mock up only, plase use MongoDB
const findUserById = (id) => {
    for (var i=0; i < Users.length; i++) {
        if (Users[i].id == id) {
            return Users[i];
        }
    }
    return null;
}

// Mock up only, plase use MongoDB
const addUser = (user) => {
    Users.push(user);
}

// Mock up only, plase use MongoDB
const deleteUserById = (id) => {
    for( var i = 0; i < Users.length; i++){ 
        if ( Users[i].id == id) { 
            Users.splice(i, 1); 
            return;
        }
    }
}

module.exports = {
    
    getUser: (req, res) =>  {
        res.json(Users);
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        // Please use MongoDB
        const user = findUserById(id);
        res.json(user);
    },

    getUserByEmail: (req, res) => {
        const email = req.body.email;
        // Please use MongoDB
        const user = findUserByEmail(email);
        res.json(user);
    },

    registerUser: (req, res) => {
        const id = Users.length + 1; // mockup only please use uuid()
        const body = req.body;
        body['id'] = id;
        user = {id, ...body};
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
    findUserByEmail,
}