const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin-model");
const User = require("../models/User/User-model");

const authToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return null;

  const decoded = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return null;
      req.decoded = decoded;
      return true;
    }
  );
  return decoded;
};

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = jwt.sign(
          { username: username, role: "admin" },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.send({ ...admin._doc, token });
      } else {
        res.send(`Wrong password`);
      }
    } else {
      res.send(`Admin not found`);
      // throw new Error('Admin not found')
    }
  },
  ban: async (req, res) => {
    const auth = authToken(req);

    if (auth && req.decoded.role === "admin") {
      const username = req.body.target;
      const user = await User.findOne({ username });
      if (!user) {
        res.send(`User not found`);
        return;
      }

      const updated = await User.updateOne(
        { username },
        { banStatus: !user.banStatus }
      );
      if (updated.n) {
        res.send(`Ban/Unban user successful`);
      } else {
        res.send(`Ban/Unban user unsuccessful`);
      }
    } else {
      res.send(`Authentication fail`);
    }
  },
};
