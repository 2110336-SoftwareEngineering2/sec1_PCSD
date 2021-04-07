const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const server = http.createServer(app);

// Middlewares
app.use(cors());

// chat socket server
const chatServer = require("./chat/server");
chatServer.listen(server);

// fork new process to crate noti socket server
const notiApp = express();
notiApp.use(cors());
const notiServer = http.createServer(notiApp);
const notificationServer = require("./notification/notification");
notificationServer.listen(notiServer);
notiServer.listen(5000, (err) => {
  console.log(`Notification server listens on port ${5000}`);
});

// Routes
const UserRoute = require("./routes/User");
const AuthRoute = require("./routes/Authentication");
const AdminRoute = require("./routes/Admin");
const ChatRoute = require("./routes/Chat");
const ReserveRoute = require("./routes/Reserve");
const NotificationsRoute = require("./routes/Notification");

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

// Authentication route
app.use("/auth", AuthRoute);

// Admin route
app.use("/admin", AdminRoute);

// Chat route
app.use("/chat", ChatRoute);

app.use("/reserve", ReserveRoute);

// Notifications Route
app.use("/notifications", NotificationsRoute);

app.get("/", (req, res) => {
  res.send("First page");
});

// Server listenining on Port
server.listen(port, (error) => {
  console.log(`Listening on port ${port}`);
});
