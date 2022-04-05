const CustomAPIError = require("./custom-api"),
  { StatusCodes } = require("http-status-codes");

class UnauthorizedAPI extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedAPI;
