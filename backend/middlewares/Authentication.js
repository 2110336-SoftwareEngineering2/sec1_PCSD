const { authToken } = require("../controllers/Authentication");

module.exports = {

    UserMiddleware: (req, res, next) => {
        const user = authToken(req, res);
        if (user.nullToken) {
            res.status(403).send("Forbidden Authentication error. Please set Bearer headers with access token");
            res.end()
        } else if (user.tokenError) {
            res.status(403).send("Forbidden. The accessToken is invalid.")
            res.end()
        } else {
            next();
        }
    }
}