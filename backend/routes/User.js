const express = require("express");
const { default: axios } = require("axios");
const multer = require("multer");

const router = express.Router();

const UserController = require("../controllers/User");
const PetController = require("../controllers/Pet");
const CaretakerController = require("../controllers/Caretaker");
const PaymentController = require("../controllers/Payment");
const userprofile = require("../controllers/userprofile");
const ReserveCaretakerController = require("../controllers/Reserve_Caretaker");


// For testing, currently unused
router.get("/", (req, res) => {
  UserController.getUser(req, res);
});

router.get("/profile/:username", (req, res) => {
  UserController.getUserByUsername(req, res);
});

router.get("/usersinfo", (req, res) => {
  UserController.getAllUsersInfo(req, res);
});

// For testing, currently unused
router.get("/emails", (req, res) => {
  UserController.getAllEmails(req, res);
});

router.post("/email", (req, res) => {
  UserController.getUserByEmail(req, res);
});

// For testing, currently unused
router.get("/account/:id", (req, res) => {
  UserController.getUserById(req, res);
});

router.post("/register", (req, res) => {
  UserController.registerUser(req, res);
});

router.post("/caretaker/rate", (req, res) => {
  CaretakerController.rate(req.body, res);
});

router.post("/caretaker", (req, res) => {
  CaretakerController.addCaretaker(req, res);
});

router.post("/caretaker", (req, res) => {
  CaretakerController.addCaretaker(req, res);
});

router.post("/caretaker/search", (req, res) => {
  CaretakerController.SearchCaretaker(req.body, res);
});

router.post("/caretaker/find", (req, res) => {
  CaretakerController.getCaretaker(req, res);
});

// For testing, currently unused
// router.delete("/account/:id", (req, res) => {
//   UserController.deleteUser(req, res);
// });

router.delete("/account", (req, res) => {
  UserController.deleteUser(req, res);
});

router.get("/pet", (req, res) => {
  PetController.getPet(req, res);
});

router.post("/pet", (req, res) => {
  PetController.addPet(req, res);
});

router.delete("/pet", (req, res) => {
  PetController.removePet(req, res);
});

router.post("/edit", (req, res) => {
  UserController.editUser(req,res);
});

router.post("/edit/caretaker", (req, res) => {
  CaretakerController.updateCaretaker(req, res);
});

router.post("/topup", (req, res) => {
  PaymentController.topUp(req,res);
});

router.post("/transfer", (req, res) => {
  const type = req.query.type;
  if(type === "transfer") {
    PaymentController.transfer(req, res);
  } else if(type === "receive") {
    PaymentController.receivePayment(req, res);
  } else {
    PaymentController.cancelPayment(req, res);
  }
});

router.get("/payment", (req, res) => {
  PaymentController.getPayment(req, res);
});

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./uploads/');
  },
  filename: function(req ,file ,cb){
    cb(null,req.body.email);
  }
});

const upload = multer({storage: multer.memoryStorage()});
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);
// const fs = require('fs');

router.post("/profilepic", upload.single("file"), async function(req, res, next) {
    // const {
    //   file,
    //   body: { name }
    // } = req;
  
    // const fileName = 'test.jpg';
    // await pipeline(
    //   // file.stream,
    //   fs.createWriteStream(`${__dirname}/../uploads/`+filename)
    // );
    const Image = {
      op : "put",
      email : req.body.email,
      data : req.file.buffer.toString('base64')
    };
    axios.post("https://9dhem6smf6.execute-api.us-west-1.amazonaws.com/default/PCSD_image",Image)
      .then(apires => {
        res.send(apires);
      })
      .catch(err=>{
        res.send(err);
      });
});

router.use('/uploads',express.static('uploads'));

module.exports = router;
