const Payment = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors"),
  fs = require("fs"),
  config = require("../../../config");

// Get all data payments
const getAllPayments = async (req, res, next) => {
  try {
    const { status } = req.query;

    let condition = { user: req.user.id };

    if (status) {
      condition = { ...condition, status: status };
    }

    const result = await Payment.find(condition);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Get a data payment by id
const getOnePayment = async (req, res, next) => {
  try {
    const { id: PaymentId } = req.params;

    const result = await Payment.findOne({ _id: PaymentId, user: req.user.id });

    if (!result) throw new CustomAPIError.NotFoundError(`Payment id ${PaymentId} is not found!`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Create a new data payment
const createPayment = async (req, res, next) => {
  try {
    const { type, status } = req.body,
      user = req.user.id;

    let result;

    if (!req.file) {
      result = await Payment({ type, status, user }).save();
    } else {
      result = await Payment({ type, imageUrl: req.file.filename, status, user }).save();
    }

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Update a data payment by id
const updatePayment = async (req, res, next) => {
  try {
    const { type, status } = req.body,
      { id: PaymentId } = req.params,
      user = req.user.id;

    let result = await Payment.findOne({ _id: PaymentId, user });

    if (!result) throw new CustomAPIError.NotFoundError(`Payment id ${PaymentId} is not found!`);

    if (!req.file) {
      result.type = type;
      result.status = status;
    } else {
      let currentImage = `${config.rootPath}/public/uploads/payments/${result.imageUrl}`;

      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      result.type = type;
      result.status = status;
      result.imageUrl = req.file.filename;
    }

    await result.save();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Delete a data payment by id
const deletePayment = async (req, res, next) => {
  try {
    const { id: PaymentId } = req.params,
      user = req.user.id;

    let result = await Payment.findOne({ _id: PaymentId, user });

    if (!result) throw new CustomAPIError.NotFoundError(`Payment id ${PaymentId} is not found!`);

    let currentImage = `${config.rootPath}/public/uploads/payments/${result.imageUrl}`;

    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    await result.remove();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(er);
  }
};

// Change status of a data payment by id
const changeStatusPayment = async (req, res, next) => {
  try {
    const { id: PaymentId } = req.params,
      user = req.user.id;

    let result = await Payment.findOne({ _id: PaymentId, user });

    if (!result) throw new CustomAPIError.NotFoundError(`Payment id ${PaymentId} is not found!`);

    result.status = !result.status;

    await result.save();

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllPayments, getOnePayment, createPayment, updatePayment, deletePayment, changeStatusPayment };
