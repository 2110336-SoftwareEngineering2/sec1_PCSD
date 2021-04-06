//  Reserve Care taker is the operation when user in user role reserve and unresurve the caretaker.
const checkAuth = require("./Authentication");
const { deletePaymentById } = require("./Payment");
// const Caretaker = require("../models/User/Caretaker-model");
// const checkUser = require("./User");
const User = require("../models/User/User-model");
const Reserve = require("../models/User/Reserve-model");
const Payment = require("../models/User/Payment-model");

const dateStringToTimeStamp = (date) => {
  var x = date.replace(' ', 'T');
  x += ':00Z';
  var d = new Date(x);
  return d.getTime();
}

const transfer = async (senderEmail, receiverEmail, amount) => {
  const sender = await User.findOne({ email: senderEmail });
  const receiver = await User.findOne({ email: receiverEmail });

  const sufficient = sender.balance.bytes - amount >= 0;

  if (!sufficient) {
    return null;
  } else {
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
    const newSender = await User.findOneAndUpdate(
      { email: senderEmail },
      { $inc: { balance: -amount } },
      { new: true }
    );
    newPayment.save();
    // console.log(newPayment._id)

    return newPayment._id;
  }
};

const getReserveByEmail = async (req, res) => {
  const email = req.params.email;
  var reserves = await Reserve.find({"$or": [{caretaker: email}, {petowner: email}]}, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      // res.status(200).json(result);
      return result;
    }
  });
  var payments = [];
  var tmp = [];
  for (var i=0; i<reserves.length; i++) {
    const id = reserves[i].paymentId;
    var payment = await Payment.findOne({_id: id});
    if (payment !== null) {
      payments.push(payment);
      var x = {...reserves[i], "payment":payment};
      x = {...x._doc, payment: x.payment};
      // console.log(x)
      tmp.push(x);
    }
  }
  res.json(tmp)
}

const reserveCaretaker = async (req, res) => {
  // const startDate = dateStringToTimeStamp(req.body.startDate);
  // const endDate = dateStringToTimeStamp(req.body.endDate);
  // const rate = req.body.rate;
  // const hours = (endDate - startDate) / (1000*3600);
  // const amount = rate * hours;

  const paymentId = await transfer(req.body.petowner, req.body.caretaker, req.body.amount);
  if (paymentId === null) {
    res.status(400).send("Payment Error");
  } else {
    var data = {
      petowner: req.body.petowner,
      caretaker:req.body.caretaker, // email
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      rate : req.body.rate,
      service :req.body.service,
      status :req.body.status,
      pets :req.body.pets,
      amount: req.body.amount,
      paymentId: paymentId
    }

    const newReserve = new Reserve(data);
    newReserve.save((err) => {
      if (err) {
        console.log(err)
        res.status(400).send(err);
      } else {
        // console.log(newReserve)
        res.status(200).json(newReserve);
      }
    });
  }
};

const removeReserveCaretaker = async (req, res) => {
  // const user = checkAuth.authToken(req, res);
  // const problem = user.nullToken | user.tokenError;
    
  // if (!problem && user.role === "user") {
  const reserveId = req.params.id;
  console.log(reserveId)
  await Reserve.findOneAndDelete(
    {
      _id: reserveId,
    },
    (err, doc) => {
      if (err) {
        res.status(400).send(err);
      } else {
        deletePaymentById(doc.paymentId);
        res.status(200).send("Remove reserve successful");
      }
    },
    {new: false}
  );
  // }
};

module.exports = {
  reserveCaretaker: async (req, res) => {
    await reserveCaretaker(req, res);
  },
  getReserveByEmail: async (req, res) => {
    await getReserveByEmail(req, res);
  },
  removeReserveCaretaker: async (req, res) => {
    await removeReserveCaretaker(req, res);
  }
};