const CustomAPIError = require("./custom-api"),
  BadRequestAPI = require("./bad-request"),
  NotFoundAPI = require("./not-found"),
  Forbidden = require("./unauthorized");

module.exports = { CustomAPIError, BadRequestAPI, NotFoundAPI, Forbidden };
