const { StatusCodes } = require("http-status-codes"),
  errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.message);
    let customError = {
      // Set Default
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || "Something went wrong. Try again later!",
    };
    // Cek untuk error yang masuk catch
    if (err.name === "ValidationError") {
      customError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(",");
      customError.statusCode = 400;
    }
    if (err.code && err.code === 11000) {
      customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
      customError.statusCode = 400;
    }
    if (err.name === "CastError") {
      customError.msg = `No item found with id : ${err.value}`;
      customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
  };

module.exports = errorHandlerMiddleware;
