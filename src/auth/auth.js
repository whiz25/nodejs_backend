const jwt = require("jsonwebtoken");

require("dotenv").config();

const accessTokenSecret = process.env.ACCESSTOKENSECRET;

const verifyJWT = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const authorization = req.headers.authorization.split(" ");
      if (authorization[0] !== "Bearer") {
        return res.sendStatus(401);
      }
      req.jwt = jwt.verify(authorization[1], accessTokenSecret);
      return next();
    } catch (err) {
      return res.sendStatus(403);
    }
  }
  return res.sendStatus(401);
};

module.exports = verifyJWT;
