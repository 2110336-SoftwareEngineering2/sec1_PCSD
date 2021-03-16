const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User");
const PetController = require("../controllers/Pet");
const userprofile = require("../controllers/userprofile");
const multer = require("multer");
const { default: axios } = require("axios");


// For testing, currently unused
router.get("/", (req, res) => {
  UserController.getUser(req, res);
});

// For testing, currently unused
router.post("/", (req, res) => {
  UserController.getUserByEmail(req, res);
});

router.get("/usersinfo", (req, res) => {
  UserController.getAllUsersInfo(req, res);
});

// For testing, currently unused
router.get("/emails", (req, res) => {
  UserController.getAllEmails(req, res);
});

// For testing, currently unused
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

// For testing, currently unused
router.delete("/account/:id", (req, res) => {
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
})

router.post("/topup", (req, res) => {
  UserController.TopUp(req,res);
});

router.post("/transfer", (req, res) => {
  UserController.transfer(req, res);
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
