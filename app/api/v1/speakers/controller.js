const Speaker = require("../../models/speaker"),
  CustomAPIError = require("../../errors"),
  { StatusCodes } = require("../../constants");

// Get all speakers
const getAllSpeakers = async (req, res, next) => {
  try {
    const result = await Speaker.find({ user: req.user.id });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllSpeakers };
