const User = require("../users/model"),
  { StatusCodes } = require("http-status-codes");

const signup = async (req, res, next) => {
  try {
    const { email, name, password, role } = req.body,
      result = new User({ email, name, password, role });

    await result.save();
    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup };
