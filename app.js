const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const verifyJWT = require("./src/auth/auth");
const {
  login,
  patchJson,
  generateImageThumbnail,
} = require("./src/routes/routes");

const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));

require("dotenv").config();

app.post("/login", login);
app.post("/patch", [verifyJWT, patchJson]);
app.post("/thumbnail", [verifyJWT, generateImageThumbnail]);

app.listen(process.env.PORT);

module.exports = app;
