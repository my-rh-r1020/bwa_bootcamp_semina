const Participant = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors"),
  { createTokenUser, createJWT } = require("../../../utils");

// Signup Participant
const signup = async (req, res, next) => {
  try {
    const { email, firstname, lastName, password, role } = req.body,
      result = new Participant({ email, firstname, lastName, password, role });

    await result.save();

    delete result._doc.password;

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const getAllParticipants = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = { signup };
