const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({});

module.exports = mongoose.model("Event", EventSchema);
