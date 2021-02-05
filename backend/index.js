const express = require('express');
const app = express();

const UserRoute = require('./routes/User');

const port = process.env.PORT || 4000;

// Body Parser Json
app.use(express.json());

// User route
app.use('/user', UserRoute);

app.listen(port, (error) => {
    console.log(`Listening on port ${port}`);
});