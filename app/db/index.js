const mongoose = require("mongoose"),
  { urlDb } = require("../config/index");

mongoose.connect(urlDb);
const db = mongoose.connection;

module.exports = db;
