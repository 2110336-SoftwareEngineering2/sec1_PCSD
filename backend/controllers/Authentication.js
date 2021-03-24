const jwt = require("jsonwebtoken");
const User = require("../models/User/User-model");
const bcrypt = require("bcrypt");

const validEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const data = user._doc;
      return {
        ...data,
      };
    }
  }
  return null;
};

const generateAccessToken = (email, secretKey) => {
  const accessToken = jwt.sign({ ...email, role: "user" }, secretKey, {
    expiresIn: "1d",
  });
  return accessToken;
};

const authToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.status(401).sen("Token is null.");
    return false;
  }

  // decoded is decoded data; In this case is an email.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).send("Validate token error or token has expired");
      return false;
    }
    else {
      res.status(200).json(decoded);
      return true;
    }
  });
};

module.exports = {
  login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const val = await validEmailAndPassword(email, password);
    if (val) {
      const accessToken = generateAccessToken(
        {
          email: email,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.status(201).json({
        ...val,
        accessToken: accessToken,
      });
    } else {
      return res.status(401).send("Email or Password invalid");
    }
  },

  validateAccessToken: (req, res) => {
    authToken(req, res);
  },

  // test
  logout: (req, res) => {
    // remove access token in web browser (client side process)
    // store access token in blacklist token in redis (in-memory database)
    res.send("logout");
  },
};
