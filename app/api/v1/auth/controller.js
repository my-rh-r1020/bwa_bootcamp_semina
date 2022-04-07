const User = require("../users/model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

const signup = async (req, res, next) => {
  try {
    const { email, name, password, role } = req.body,
      result = new User({ email, name, password, role });

    await result.save();
    delete result._doc.password;

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomAPIError.BadRequestError("Please provide email and password!");
    }

    const result = await User.findOne({ email: email });
    if (!result) {
      throw new CustomAPIError.UnauthorizedError("Invalid Email!");
    }

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin };
