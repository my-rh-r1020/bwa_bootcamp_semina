const Event = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors"),
  Category = require("../categories/model"),
  Speaker = require("../speakers/model"),
  fs = require("fs"),
  config = require("../../../config");

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

    const result = await Event.find(condition).populate({ path: "category", select: "_id name" }).populate({ path: "speaker", select: "_id name role" });
    // Example with alias
    // const result = await Event.find(condition)
    //   .populate({ path: "category", select: "_id name" })
    //   .populate({ path: "speaker", select: { _id: 1, foto: `$avatar`, avatar: 1, name: 1 } });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one data event by id
const getOneEvent = async (req, res, next) => {
  try {
    const { id: EventId } = req.params;

    const result = await Event.findOne({ _id: EventId, user: req.user.id }).populate({ path: "category", select: "_id name" }).populate({ path: "speaker", select: "_id name role" });

    if (!result) throw new CustomAPIError.NotFoundError(`Event id ${EventId} is not found!`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create a new data event
const createEvent = async (req, res, next) => {
  try {
    const { title, price, date, about, venueName, tagline, keypoint, status, stock, category, speaker } = req.body,
      user = req.user.id;

    let result;

    if (!keypoint) throw new CustomAPIError.BadRequestError("Keypoint is required!");

    // Check if category and speaker is exist
    const checkCategories = await Category.findOne({ _id: category }),
      checkSpeakers = await Speaker.findOne({ _id: speaker });

    if (!checkCategories) throw new CustomAPIError.BadRequestError(`Category id ${category} is not found!`);

    if (!checkSpeakers) throw new CustomAPIError.BadRequestError(`Speaker id ${speaker} is not found!`);

    // Create data event
    if (!req.file) {
      result = await Event({ title, price, date, about, venueName, tagline, keypoint, status, stock, category, speaker, user }).save();
    } else {
      result = await Event({ title, price, date, about, venueName, tagline, keypoint: JSON.parse(keypoint), status, stock, category, speaker, cover: req.file.filename, user }).save();
    }

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update a data event by id
const updateEvent = async (req, res, next) => {
  try {
    const { title, price, date, about, venueName, tagline, keypoint, status, stock, category, speaker } = req.body,
      { id: EventId } = req.params,
      user = req.user.id;

    // Check data event
    let result = await Event.findOne({ _id: EventId, user });

    if (!result) throw new CustomAPIError.NotFoundError(`Event id ${EventId} is not found!`);

    if (!keypoint) throw new CustomAPIError.BadRequestError("Keypoint is required!");

    // Check if category and speaker is exist
    const checkCategories = await Category.findOne({ _id: category }),
      checkSpeakers = await Speaker.findOne({ _id: speaker });

    if (!checkCategories) throw new CustomAPIError.BadRequestError(`Category id ${category} is not found!`);

    if (!checkSpeakers) throw new CustomAPIError.BadRequestError(`Speaker id ${speaker} is not found!`);

    // Update data event
    if (!req.file) {
      (result.title = title),
        (result.price = price),
        (result.date = date),
        (result.about = about),
        (result.venueName = venueName),
        (result.tagline = tagline),
        (result.keypoint = JSON.parse(keypoint)),
        (result.status = status),
        (result.stock = stock),
        (result.category = category),
        (result.speaker = speaker),
        (result.user = user);
    } else {
      let currentImage = `${config.rootPath}/public/uploads/cover_event/${result.cover}`;

      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      (result.title = title),
        (result.price = price),
        (result.date = date),
        (result.about = about),
        (result.venueName = venueName),
        (result.tagline = tagline),
        (result.keypoint = JSON.parse(keypoint)),
        (result.status = status),
        (result.stock = stock),
        (result.category = category),
        (result.speaker = speaker),
        (result.user = user),
        (result.cover = req.file.filename);
    }

    await result.save();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete a data event by id
const deleteEvent = async (req, res, next) => {
  try {
    const { id: EventId } = req.params,
      user = req.user.id;

    let result = await Event.findOneAndDelete({ _id: EventId, user });

    if (!result) throw new CustomAPIError.NotFoundError(`Event id ${EventId} is not found!`);

    let currentImage = `${config.rootPath}/public/uploads/cover_event/${result.cover}`;

    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllEvents, getOneEvent, createEvent, updateEvent, deleteEvent };
