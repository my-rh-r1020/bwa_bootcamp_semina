const Event = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all data events
const getAllEvents = async (req, res, next) => {
  try {
    // Filter events by title
    const { keyword, category, speaker } = req.query,
      user = req.user.id;

    let condition = { user };

    if (keyword) condition = { ...condition, title: { $regex: keyword, $options: "i" } };

    // Filter events by category
    if (category) condition = { ...condition, category };

    // Filter events by speaker
    if (speaker) condition = { ...condition, speaker };

    const result = await Event.find(condition);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one data event by id
const getOneEvent = async (req, res, next) => {
  try {
    const { id: EventId } = req.params;

    const result = await Event.findOne({ _id: EventId, user: req.user.id });

    if (!result) throw new CustomAPIError.NotFoundError(`Event id ${EventId} is not found!`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create a new data event
const createEvent = async (req, res, next) => {
  try {
    const { title, price, date, about, venueName, tagline, keypoint, category, speaker } = req.body,
      user = req.user.id;

    let result;

    if (!keypoint) throw new CustomAPIError.BadRequestError("Keypoint is required!");

    if (!req.file) {
      result = await Event({ title, price, date, about, venueName, tagline, keypoint, category, speaker, user }).save();
    } else {
      result = await Event({ title, price, date, about, venueName, tagline, keypoint, category, speaker, cover: req.file.filename, user }).save();
    }

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update a data event by id
const updateEvent = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

// Delete a data event by id
const deleteEvent = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllEvents, getOneEvent, createEvent };
