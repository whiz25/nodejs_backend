const jwt = require("jsonwebtoken");
const patch = require("jsonpatch");
const sharp = require("sharp");

const validateUsername = require("../validators/username");
const validatePassword = require("../validators/password");
const validateUrl = require("../validators/url");

const accessTokenSecret = process.env.ACCESSTOKENSECRET;

const login = (req, res) => {
  const { username, password } = req.body;

  const validUser = validateUsername(username)
  && validatePassword(password)
  && username
  && password;

  if (validUser) {
    const accessToken = jwt.sign(username, accessTokenSecret);
    res.json(accessToken);
  }
  res.sendStatus(400);
};

const patchJson = (req, res) => {
  const requestBody = req.body;
  const jsonPatch = requestBody.patch;

  const { doc } = requestBody.doc;

  let path;
  let patchPath;

  for (let i = 0; i < jsonPatch.length; i += 1) {
    path = jsonPatch[i].path;
    patchPath = path.replace("/", "");
  }

  const docKeys = Object.keys(doc);

  for (let i = 0; i < docKeys.length; i += 1) {
    if (docKeys[i] === patchPath) {
      const patchedJSON = patch.apply_patch(doc, jsonPatch);
      res.json(patchedJSON);
    }
  }

  res.sendStatus(400);
};

const generateImageThumbnail = (req, res) => {
  const requestBody = req.body;

  const validUrl = validateUrl(requestBody.imageUrl);

  if (validUrl) {
    const generatedImageThumbnail = sharp(requestBody.imageUrl).resize(50, 50);

    res.json(generatedImageThumbnail);
  }

  res.sendStatus(400);
};

module.exports = { login, patchJson, generateImageThumbnail };
