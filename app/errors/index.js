const CustomAPIError = require("./custom-api"),
  BadRequestError = require("./bad-request"),
  NotFoundError = require("./not-found"),
  UnauthorizedError = require("./unauthorized");

module.exports = { CustomAPIError, BadRequestError, NotFoundError, UnauthorizedError };
