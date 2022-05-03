const Event = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all data events
const getAllEvents = async (req, res, next) => {
  try {
    const result = await Event.find({ user: req.user.id });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get one data event by id
const getOneEvent = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

// Create a new data event
const createEvent = async (req, res, next) => {
  try {
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

module.exports = { getAllEvents };
