const jwt = require("jsonwebtoken");

require("dotenv").config();

const accessTokenSecret = process.env.ACCESSTOKENSECRET;

const verifyJWT = (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, accessTokenSecret, (err, user) => {
        req.user = user;
        next();
      });
    } catch (err) {
      res.send(err);
    }
  }
  res.sendStatus(401);
};

module.exports = verifyJWT;
