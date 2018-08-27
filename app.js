const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
module.exports = app;
