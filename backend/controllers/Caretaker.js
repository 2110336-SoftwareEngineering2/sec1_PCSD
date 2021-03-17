const Caretaker = require("../models/User/Caretaker-model");

const getCaretaker = async (req, res) => {
  const caretakerInfo = await Caretaker.findOne({email:req.body.email});
  res.send(caretakerInfo);
};

const addCaretaker = async (req, res) => {
  const newCaretaker = new Caretaker({
      ...req.body,
    });
  newCaretaker.save((err) => {
      if (err) console.log(err);
  });
  res.send(newCaretaker);
};

const updateCaretaker = async (req, res) => {
    await Caretaker.updateOne({email:req.body.email}, req.body);
    res.send("Edit caretaker successful");
};

module.exports = {
    addCaretaker,
    updateCaretaker,
    getCaretaker
}