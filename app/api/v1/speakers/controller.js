const Speaker = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all data speakers
const getAllSpeakers = async (req, res, next) => {
  try {
    const result = await Speaker.find({ user: req.user.id });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create a new data speaker
const createSpeaker = async (req, res, next) => {
  try {
    const { name, role } = req.body,
      user = req.user.id;

    let result;

    // const check = await getAllSpeakers({ user });
    // const check = await Speaker.find({ user: req.user.id });

    // if (check) throw new CustomAPIError.BadRequestError("Duplicate name speaker!");

    // const result = await Speaker.create({ name, user });

    console.log("req.file >>", req.file);

    if (!req.file) {
      // throw new CustomAPIError.BadRequestError("Please upload a file!");
    } else {
    }

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllSpeakers, createSpeaker };
