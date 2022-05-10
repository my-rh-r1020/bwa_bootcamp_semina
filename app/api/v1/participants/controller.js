const Participant = require("./model"),
  Event = require("../events/model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors"),
  { createTokenUser, createJWT } = require("../../../utils");

// Signup Participant
const signup = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, role } = req.body,
      result = new Participant({ email, firstName, lastName, password, role });

    await result.save();

    delete result._doc.password;

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Signin Participant
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomAPIError.BadRequestError("Please provide your email and password!");
    }

    // Find participant by email
    const result = await Participant.findOne({ email: email });

    if (!result) throw new CustomAPIError.UnauthorizedError("Your Email is Invalid");

    // Check if password is correct
    const isPasswordCorrect = await result.comparePassword(password);

    if (!isPasswordCorrect) throw new CustomAPIError.UnauthorizedError("Your Password is Invalid");

    // Create token
    const token = createJWT({ payload: createTokenUser(result) });

    res.status(StatusCodes.OK).json({ data: { token } });
  } catch (err) {
    next(err);
  }
};

// Landing Page Participant
const landingPage = async (req, res, next) => {
  try {
    const result = await Event.find({ status: true }).select("title cover price venueName date category");

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin, landingPage };
