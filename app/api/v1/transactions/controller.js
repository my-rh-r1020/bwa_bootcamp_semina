const Transaction = require("./model"),
  { StatusCodes } = require("http-status-codes"),
  CustomAPIError = require("../../../errors"),
  moment = require("moment");

const getAllTransactions = async (req, res, next) => {
  try {
    const { event, payment, participant, keyword, startDate, endDate, limit = 10, page = 1 } = req.query;

    let condition = { user: req.user.id };

    // Filter transactions by event
    if (event) {
      condition = { ...condition, event };
    }

    // Filter transactions by payment
    if (payment) {
      condition = { ...condition, payment };
    }

    // Filter transactions by participant
    if (participant) {
      condition = { ...condition, participant };
    }

    // Filter transactions by keyword
    if (keyword) {
      condition = { ...condition, "historyEvent.title": { $regex: keyword, $options: "i" } };
    }

    // Filter transactions by date
    if (startDate && endDate) {
      condition = { ...condition, "historyEvent.date": { $gte: startDate, $lte: moment(endDate).add(1, "days") } };
    }

    // Pagination transactions
    const result = await Transaction.find(condition)
      .limit(limit)
      // Jumlah data yang akan ditampilkan
      .skip(limit * (page - 1));

    const count = await Transaction.countDocuments(condition);

    res.status(200).json({ data: result, pages: Math.ceil(count / limit), total: count });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTransactions };
