const auth = require("./Authentication");

const User = require("../models/User/User-model");
const Payment = require("../models/User/Payment-model");

const getPayment = async (req, res) => {
  const decoded = auth.authToken(req, res);
  const problem = decoded.nullToken | decoded.tokenError | (decoded.role !== "user");

  if (problem) {
    res.status(400).send({ tokenError: true });
  }

  const payments = await Payment.find(
    {
      $or: [
        { petownerEmail: decoded.email },
        { caretakerEmail: decoded.email },
      ],
    },
    { __v: 0 }
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

    const result = await addBalance(email, body.value);

    if(result.error) {
        res.status(400).send(result.error);
    } else {
        res.status(200).send(result);
    }

  } else {
    res.status(400).send("user not found");
  }
};

const addBalance = async (email, value) => {
    const filter = { email: email };
    const update = { $inc: { balance: value } };

    const result = await User.findOneAndUpdate(filter, update, { new: true })

    return result;
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
        petownerFname: sender.firstname,
        petownerLname: sender.lastname,
        caretakerEmail: receiver.email,
        caretakerFname: receiver.firstname,
        caretakerLname: receiver.lastname,
        transferStatus: "WAITING",
        amount: amount,
      });
      newPayment.save();

      res.status(200).send({
        senderBalance: newSender.balance.bytes,
      });
    }
  }
};

const modifyPayment = async (req, res, status) => {
    const paymentId = req.body.paymentId;

    const decoded = auth.authToken(req, res);
    const problem =
        decoded.nullToken | decoded.tokenError | (decoded.role !== "user");
    if (problem) {
        res.status(400).send({ tokenError: true });
    }

    const payment = await Payment.findOneAndUpdate(
      { _id: paymentId, $or: [{transferStatus: { $eq: "WAITING" } }, {transferStatus: { $eq: "ACCEPTED" } }]},
      { transferStatus: status },
      { new: true }
    );
    if(payment && (status !== "ACCEPTED")) {
      var des = payment.caretakerEmail;
      if(status === "CANCELLED") {
        des = payment.petownerEmail;
      }
      const result = await addBalance(des, payment.amount.bytes);
      if(result.error) {
          res.status(400).send(result.error);
      } else {
          res.status(200).send(payment);
      }
    } else if(payment && (status === "ACCEPTED")) {
      res.status(200).send(payment);
    } else {
      res.status(400).send("No payment met the requirements");
    }
};

module.exports = {
  topUp,
  transfer,
  getPayment,
  receivePayment: async (req, res) => {
    modifyPayment(req, res, "DONE")
  },
  cancelPayment: async (req, res) => {
    modifyPayment(req, res, "CANCELLED")
  },
  acceptCommission: async (req, res) => {
    modifyPayment(req, res, "ACCEPTED")
  }
};
