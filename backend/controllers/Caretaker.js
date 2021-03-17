const Caretaker = require("../models/User/Caretaker-model");

const addCaretaker = async (req, res) => {
    const newCaretaker = new Caretaker({
        ...req.body,
      });
    newCaretaker.save((err) => {
        if (err) console.log(err);
    });
    res.send(newCaretaker);
};

const updateCaretaker = async (body) => {
    await Caretaker.updateOne({email:body.email}, body);
  };

module.exports = {
    addCaretaker,
    updateCaretaker
}