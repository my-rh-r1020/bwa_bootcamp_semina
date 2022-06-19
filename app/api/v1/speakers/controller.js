const Speaker = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors"),
  fs = require("fs"),
  config = require("../../../config");

// Get all data speakers
const getAllSpeakers = async (req, res, next) => {
  try {
    // Filter speakers by name
    const { keyword } = req.query;

    let condition = { user: req.user.id };

    if (keyword) {
      condition = { ...condition, name: { $regex: keyword, $options: "i" } };
    }

    const result = await Speaker.find(condition);
    // const result = await Speaker.find({ user: req.user.id });

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

// Update a data speaker by id
const updateSpeaker = async (req, res, next) => {
  try {
    const { name, role } = req.body,
      { id: SpeakerId } = req.params,
      user = req.user.id;

    let result = await Speaker.findOne({ _id: SpeakerId, user });

    if (!result) throw new CustomAPIError.NotFoundError(`Speaker id ${SpeakerId} is not found!`);

    if (!req.file) {
      result.name = name;
      result.role = role;
    } else {
      let currentImage = `${config.rootPath}/public/uploads/avatar/${result.avatar}`;

      if (result.avatar !== "default.png" && fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      result.name = name;
      result.role = role;
      result.avatar = req.file.filename;
    }

    await result.save();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete a data speaker by id
const deleteSpeaker = async (req, res, next) => {
  try {
    const { id: SpeakerId } = req.params,
      user = req.user.id;

    let result = await Speaker.findOne({ _id: SpeakerId, user });

    if (!result) throw new CustomAPIError.NotFoundError(`Speaker id ${SpeakerId} is not found!`);

    let currentImage = `${config.rootPath}/public/uploads/avatar/${result.avatar}`;

    if (result.avatar !== "default.png" && fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    await result.remove();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllSpeakers, createSpeaker, getOneSpeaker, updateSpeaker, deleteSpeaker };
