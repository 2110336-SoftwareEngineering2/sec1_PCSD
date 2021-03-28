const auth = require("./Authentication");

const User = require("../models/User/User-model");
const Payment = require("../models/User/Payment-model");

const getPayment = async (req, res) => {
  const decoded = auth.authToken(req, res);
  const problem = decoded.nullToken | decoded.tokenError;

  if (problem) {
    res.status(400).send({ senderError: true });
  }

  const payments = await Payment.find(
    {
      petownerEmail: decoded.email,
      transferStatus: false,
    },
    { _id: 0, __v: 0 }
  );

  res.status(200).send(payments);
};

const topUp = async (req, res) => {
  // Check if user is logged in
  const user = auth.authToken(req, res);
  const problem = user.nullToken | user.tokenError;

  if (!problem && user.role === "user") {
    const body = req.body;
    const email = user.email;
    const filter = { email: email };
    const update = { $inc: { balance: body.value } };

    await User.findOneAndUpdate(filter, update, { new: true }).exec(
      (err, result) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.status(404).send("user not found");
  }
};

const transfer = async (req, res) => {
  const decoded = auth.authToken(req, res);
  const problem =
    decoded.nullToken | decoded.tokenError | (decoded.role !== "user");

  if (problem) {
    res.status(400).send({ senderError: true });
  }

  const senderEmail = decoded.email;
  const receiverEmail = req.body.receiverEmail;
  const amount = req.body.amount;

  const sender = await User.findOne({ email: senderEmail });
  const receiver = await User.findOne({ email: receiverEmail });

  if (!sender) {
    res.status(400).send({ senderError: true });
  } else if (!receiver) {
    res.status(400).send({ receiverError: true });
  } else {
    const sufficient = sender.balance.bytes - amount >= 0;

    if (!sufficient) {
      res.status(400).send({ balanceError: true });
    } else {
      const newSender = await User.findOneAndUpdate(
        { email: senderEmail },
        { $inc: { balance: -amount } },
        { new: true }
      );
      const newPayment = new Payment({
        petownerEmail: sender.email,
        caretakerEmail: receiver.email,
        transferStatus: false,
        amount: amount,
      });
      newPayment.save();

      res.status(200).send({
        senderBalance: newSender.balance.bytes,
      });
    }
  }
};

module.exports = {
  topUp,
  transfer,
  getPayment,
};
