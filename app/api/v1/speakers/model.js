const mongoose = require("mongoose");

const SpeakerSchema = new mongoose.Schema();

module.exports = mongoose.model("Speaker", SpeakerSchema);
