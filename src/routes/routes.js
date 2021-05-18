const jwt = require("jsonwebtoken");
const patch = require("jsonpatch");
const sharp = require("sharp");

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

const patchJson = (req, res) => {
  const requestBody = req.body;
  const jsonPatch = requestBody.patch;
  // eslint-disable-next-line
  const doc = requestBody.doc;

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

  if (requestBody.imageUrl) {
    const generatedImageThumbnail = sharp(requestBody.imageUrl).resize(50, 50);

    res.json(generatedImageThumbnail.options);
  }

  res.sendStatus(400);
};

module.exports = { login, patchJson, generateImageThumbnail };
