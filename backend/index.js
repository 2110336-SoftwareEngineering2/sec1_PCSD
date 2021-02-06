const express = require("express");
const app = express();
const mongoose = require("mongoose");
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
  .then(() => console.log("Database Connection Successfully"))
  .catch((err) => console.log(err));

// Body Parser Json
app.use(express.json());

// User route
app.use("/user", UserRoute);

// Authenticate route
app.use("/auth", AuthRoute);

// Server listenining on Port
app.listen(port, (error) => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello there");
});
