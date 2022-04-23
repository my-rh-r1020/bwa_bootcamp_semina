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

    if (!req.file) {
      result = await Speaker({ name, role, user }).save();
    } else {
      result = await Speaker({ name, role, avatar: req.file.filename, user }).save();
    }

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get a data speaker by id
const getOneSpeaker = async (req, res, next) => {
  try {
    const { id: SpeakerId } = req.params;

    const result = await Speaker.findOne({ _id: SpeakerId, user: req.user.id });

    if (!result) throw new CustomAPIError.NotFoundError(`Speaker id ${SpeakerId} is not found!`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllSpeakers, createSpeaker, getOneSpeaker };
