const Category = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors");

// Get all data categories
const getAllCategory = async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    let condition = { user: req.user.id };

    // Pagination Categories
    const result = await Category.find(condition)
      .limit(limit)
      // Jumlah data yang akan ditampilkan
      .skip(limit * (page - 1));

    // Document counting
    const count = await Category.countDocuments(condition);

    res.status(StatusCodes.OK).json({ data: result, pages: Math.ceil(count / limit), total: count });
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

    if (check) throw new CustomAPIError.BadRequestError("Category name is already used");

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

    const result = await Category.findOne({ _id: categoryId, user: req.user.id });

    if (!result) throw new CustomAPIError.NotFoundError(`Categories id ${categoryId} is not found!`);

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

    if (check) throw new CustomAPIError.BadRequestError("Category name is already used");

    const result = await Category.findOneAndUpdate({ _id: categoryId }, { name, user: req.user.id }, { new: true, runValidators: true });

    if (!result) throw new CustomAPIError.NotFoundError(`Categories id ${categoryId} is not found!`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete a category by id
const deleteCategory = async (req, res, next) => {
  try {
    const { id: categoryId } = req.params;

    // const result = await Category.findOne({ _id: categoryId });
    const result = await Category.findOneAndDelete({ _id: categoryId });

    if (!result) throw new CustomAPIError.NotFoundError(`Categories id ${categoryId} is not found!`);

    // await result.remove();
    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategory, createCategory, getOneCategory, updateCategory, deleteCategory };
