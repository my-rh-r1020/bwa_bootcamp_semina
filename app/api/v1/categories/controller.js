const Category = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all categoriess
const getAllCategory = async (req, res, next) => {
  try {
    const result = await Category.find({ user: req.user.id });

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create a new category
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body,
      user = req.user.id;

    const check = await Category.findOne({ user, name });

    if (check) throw new CustomAPIError.BadRequestError("Duplicate name category!");

    const result = await Category.create({ name, user });

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get a category by id
const getOneCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params;

    const result = await Category.findOne({ _id: categoryId });

    if (!result) throw new CustomAPIError.NotFoundError(`Data not found for id ${categoryId}`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update a category by id
const updateCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params,
      { name } = req.body;

    const check = await Category.findOne({ name, _id: { $ne: categoryId } });

    if (check) throw new CustomAPIError.BadRequestError("Duplicate name category!");

    const result = await Category.findOneAndUpdate({ _id: categoryId }, { name, user: req.user.id }, { new: true, runValidators: true });

    if (!result) throw new CustomAPIError.NotFoundError(`Data not found for id ${categoryId}`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete a category by id
const deleteCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params;

    const result = await Category.findOne({ _id: categoryId });

    if (!result) throw new CustomAPIError.NotFoundError(`Data not found for id ${categoryId}`);

    await result.remove();
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategory, createCategory, getOneCategory, updateCategory, deleteCategory };
