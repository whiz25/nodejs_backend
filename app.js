const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const verifyJWT = require("./src/auth/auth");
const login = require("./src/routes/routes");

const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));

app.route("/login", verifyJWT).post(login);

app.listen(process.env.PORT);
