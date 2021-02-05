const Users = require('../models/User/mock_user').users;

// Mock up only, plase use MongoDB
const findUser = (id) => {
    Users.forEach(element => {
        if (element.id == id) {
            res.json(element);
            return element;
        }
    });
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
        }
    }
}

module.exports = {
    
    getUser: (req, res) =>  {
        res.json(Users);
    },

    getUserById: (req, res) => {
        const id = req.param('id');
        const user = findUser(id);
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
        const id = req.param('id');
        deleteUserById(id);
        res.json(Users);
    },
}