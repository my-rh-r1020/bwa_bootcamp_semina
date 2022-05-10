const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    personalDetail: {
      firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: 3,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
      },
      role: {
        type: String,
        default: "Designer",
      },
    },
    participant: {
      type: mongoose.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    historyEvent: {
      title: {
        type: String,
        required: [true, "Please provide title!"],
      },
      price: {
        type: Number,
        default: 0,
      },
      date: {
        type: Date,
        required: [true, "Please provide date!"],
      },
      cover: {
        type: String,
        required: [true, "Please provide cover!"],
      },
      about: {
        type: String,
        required: [true, "Please provide about!"],
      },
      venueName: {
        type: String,
        required: [true, "Please provide venue name!"],
      },
      tagline: {
        type: String,
        required: [true, "Please provide tagline!"],
      },
      keypoint: {
        type: [String],
      },
      category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      speaker: {
        type: mongoose.Types.ObjectId,
        ref: "Speaker",
        required: true,
      },
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    historyPayment: {
      type: {
        type: String,
        required: [true, "Please provide type"],
        minlength: 3,
        maxlength: 50,
      },
      imageUrl: {
        type: String,
        required: [true, "Please provide imageUrl"],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
