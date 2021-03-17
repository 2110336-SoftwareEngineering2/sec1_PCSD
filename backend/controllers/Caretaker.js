const Caretaker = require("../models/User/Caretaker-model");

const addCaretaker = async (body) => {
    const newCaretaker = new Caretaker({
        ...body,
      });
    newCaretaker.save((err) => {
        if (err) console.log(err);
    });
};

const updateCaretaker = async (body) => {
    await Caretaker.updateOne({email:body.email}, body);
  };

module.exports = {
    addCaretaker,
    updateCaretaker,
}