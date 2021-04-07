const review = require("../models/review/review-model");
const User = require("../models/User/User-model");

const ReviewUser = async (req, res) => {
    User.findByIdAndUpdate(id,{ $push :{ 'review' : review}}, function (err, docs) {
        if(err){
            res.status(404).send(err);
        }
        else {
            res.status(200).json(docs);
        }
    }); 
}

module.exports = {
    review: async (req, res) => {
        await ReviewUser(req, res);
    }
}