const express = require("express");
const router = express.Router();
const ReserveController = require("../controllers/Reserve_Caretaker");

router.post("/caretaker", (req, res) => {
//   AdminController.ban(req, res);
    ReserveController.reserveCaretaker(req, res);
});

router.get("/:email", (req, res) => {
    ReserveController.getReserveByEmail(req, res);
});

//router.delete("/delete/:id, (req, res) => {...})
router.delete("/delete/:id", (req, res) => {
    ReserveController.removeReserveCaretaker(req, res);
});

module.exports = router;