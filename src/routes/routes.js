const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESSTOKENSECRET;

const login = (req, res) => {
  const { username, password } = req.body;

  const validUser = username && password;

  if (validUser) {
    const accessToken = jwt.sign({ username: username }, accessTokenSecret);
    res.json({ accessToken });
  }
  res.sendStatus(403);
};

module.exports = login;
