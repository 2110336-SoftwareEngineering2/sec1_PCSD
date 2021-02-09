const jwt = require("jsonwebtoken");
const User = require("../models/User/User-model");
//const UserController = require("./User");
const bcrypt = require("bcrypt");

const validEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return true;
    }
  }
  return false;
};

const generateAccessToken = (email, secretKey) => {
  const accessToken = jwt.sign(email, secretKey, { expiresIn: "15m" });
  return accessToken;
};

const generateRefreshToken = (email, secretKey) => {
  const refreshToken = jwt.sign(email, secretKey, { expiresIn: "1w" });
  return refreshToken;
};

const authToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[0];
  if (token == null) return res.sendStatus(401);

  // decoded is decoded data; In this case is an email.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.decoded = decoded;
    res.json(decoded);
  });
};

module.exports = {
  login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const val = await validEmailAndPassword(email, password);
    if (val == true) {
      const accessToken = generateAccessToken(
        {
          email: email,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      const refreshToken = generateRefreshToken(
        {
          email: email,
        },
        process.env.REFRESH_TOKEN_SECRET
      );
      return res.status(201).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
    return res.status(404).send("Email or Password invalid");
  },

  valid: (req, res) => {
    authToken(req, res);
  },

  // test
  logout: (req, res) => {
    res.send("logout");
  },
};
