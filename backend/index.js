const express = require("express");
const mongoose = require("mongoose");

const UserRoute = require("./routes/User");
const AuthRoute = require("./routes/Authentication");

const app = express();

const port = process.env.PORT || 4000;

// Body Parser Json
app.use(express.json());

// User route
app.use("/user", UserRoute);

// Authenticate route
app.use("/auth", AuthRoute);

app.listen(port, (error) => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello there");
});

const connectionURL =
  "mongodb+srv://normal-user:normalguy@cluster0.e28du.mongodb.net/Caretaker?retryWrites=true&w=majority";

mongoose
  .connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`MongoDB connected`);
  });
