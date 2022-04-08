const CustomAPIError = require("./custom-api"),
  BadRequestError = require("./bad-request"),
  NotFoundError = require("./not-found"),
  UnauthorizedError = require("./unauthorized"),
  UnauthenticatedError = require("./unauthenticated");

module.exports = { CustomAPIError, BadRequestError, NotFoundError, UnauthorizedError, UnauthenticatedError };
