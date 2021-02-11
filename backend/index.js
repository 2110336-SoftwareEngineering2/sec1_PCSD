const express = require("express");
const app = express();
const http = require('http');
const cors = require('cors');
const mongoose = require("mongoose");
const server = http.createServer(app);

// Middlewares
app.use(cors());

// chat socket server
const chatServer = require('./chat/server');
chatServer.listen(server);

// Routes
const UserRoute = require("./routes/User");
const AuthRoute = require("./routes/Authentication");

// ENVIRONMENT VARIABLE (in .env file)
require("dotenv").config();

const port = process.env.PORT;
const url = process.env.MONGO_URL;

// Database connection
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connection Successful"))
  .catch((err) => console.log(err));

// Body Parser Json
app.use(express.json());

// User route
app.use("/user", UserRoute);

// Authenticate route
app.use("/auth", AuthRoute);


app.get("/", (req, res) => {
  res.send("First page");
});

// Server listenining on Port
server.listen(port, (error) => {
  console.log(`Listening on port ${port}`);
});