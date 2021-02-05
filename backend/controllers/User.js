const User = require('../models/User/mock_user').users;

module.exports = {
    
    getUser: (req, res) =>  {
        res.json(User);
    },

    getUserById: (req, res) => {
        const id = req.param('id');
        User.forEach(element => {
            if (element.id == id) {
                res.json(element);
                return;
            }
        });
    },

    registerUser: (req, res) => {
        const id = User.length + 1; // mockup only please use uuid()
        const body = req.body;
        body['id'] = id;
        User.push(body);
        res.json({id, ...body});
    },

    deleteUser: (req, res) => {
        for( var i = 0; i < User.length; i++){ 
            if ( User[i].id == req.param('id')) { 
                User.splice(i, 1); 
            }
            res.json(User);
            return;
        }
    },
}