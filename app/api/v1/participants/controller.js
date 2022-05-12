const Participant = require("./model"),
  Event = require("../events/model"),
  Payment = require("../payments/model"),
  Transaction = require("../transactions/model"),
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
    const result = await Event.find({ status: true }).select("_id title cover price venueName date category").populate({ path: "category", select: "_id name" }).limit(4);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Detail Page Participant
const detailPage = async (req, res, next) => {
  try {
    const { id: detailPageId } = req.params;

    const result = await Event.findOne({ _id: detailPageId, status: true }).select("_id cover title about keypoint tagline price venueName date speaker").populate({ path: "speaker", select: "_id name avatar role" });

    if (!result) throw new CustomAPIError.NotFoundError(`Event with id ${detailPageId} not found`);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

// Checkout Page Participant
const checkoutPage = async (req, res, next) => {
  try {
    const { event: EventId, personalDetail, payment: PaymentId } = req.body;

    // Find event by id
    const checkingEvent = await Event.findOne({ _id: EventId });

    if (!checkingEvent) throw new CustomAPIError.NotFoundError(`Event with id ${EventId} not found`);

    // Check and update stock ticket
    if (checkingEvent.stock === 0) {
      throw new CustomAPIError.BadRequestError("Sorry, this event is sold out");
    } else {
      checkingEvent.stock = checkingEvent.stock -= 1;
      await checkingEvent.save();
    }

    const historyEvent = {
      title: checkingEvent.title,
      price: checkingEvent.price,
      date: checkingEvent.date,
      cover: checkingEvent.cover,
      about: checkingEvent.about,
      venueName: checkingEvent.venueName,
      tagline: checkingEvent.tagline,
      keypoint: checkingEvent.keypoint,
      category: checkingEvent.category,
      speaker: checkingEvent.speaker,
    };

    // Find payment by id
    const checkingPayment = await Payment.findOne({ _id: PaymentId });

    if (!checkingPayment) throw new CustomAPIError.NotFoundError(`Payment with id ${PaymentId} not found`);

    const historyPayment = {
      type: checkingPayment.type,
      imageUrl: checkingPayment.imageUrl,
    };

    // Checkout payment
    const result = new Transaction({
      personalDetail: personalDetail,
      event: EventId,
      historyEvent: historyEvent,
      payment: PaymentId,
      historyPayment: historyPayment,
      participant: req.user.id,
    });

    await result.save();

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin, landingPage, detailPage, checkoutPage };
