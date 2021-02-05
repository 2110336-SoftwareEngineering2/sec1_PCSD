const express = require('express');
const app = express();

const UserRoute = require('./routes/User');
const AuthRoute = require('./routes/Authentication');

const port = process.env.PORT || 4000;

// Body Parser Json
app.use(express.json());

// User route
app.use('/user', UserRoute);

// Authenticate route
app.use('/auth', AuthRoute);

app.listen(port, (error) => {
    console.log(`Listening on port ${port}`);
});