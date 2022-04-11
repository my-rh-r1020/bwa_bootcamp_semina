const Category = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

const getAllCategory = async (req, res, next) => {
  try {
    const result = await Category.find({ user: req.user.id });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body,
      user = req.user.id;

    const result = await Category.create({ name, user });

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategory, createCategory };
