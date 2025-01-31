const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helper/response");
const key = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    let token = req.headers["token"];
    const decodeToken = jwt.verify(token, key);
    if (decodeToken === null) {
        return errorResponse(res, 401, "Unauthorized user", null);
    } else {
        let email = decodeToken.email;
        let id = decodeToken.id;
        req.headers.email = email;
        req.headers.id = id;
        next();
    }

}