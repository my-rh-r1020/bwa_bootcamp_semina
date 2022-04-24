const dotenv = require("dotenv").config(),
  path = require("path");

module.exports = { rootPath: path.resolve(__dirname, "../../"), urlDb: process.env.MONGODB_URL_DEV, jwtSecret: process.env.JWT_SECRET };
