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

    const check = await Category.findOne({ user, name });

    if (check) throw new CustomAPIError.BadRequestError("Duplicate for name category!");

    const result = await Category.create({ name, user });

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const getOneCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params;

    const result = await User.findOne({ id: categoryId });

    if (!result) throw new CustomAPIError.NotFoundError(`Data not found for id ${categoryId}`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategory, createCategory, getOneCategory };
