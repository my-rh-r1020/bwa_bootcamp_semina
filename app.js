const express = require("express"),
  app = express(),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan");

const versionV1 = "/api/v1",
  // Router App
  usersRouter = require("./app/api/v1/users/router"),
  authRouter = require("./app/api/v1/auth/router"),
  categoriesRouter = require("./app/api/v1/categories/router"),
  speakerRouter = require("./app/api/v1/speakers/router"),
  eventRouter = require("./app/api/v1/events/router"),
  paymentRouter = require("./app/api/v1/payments/router"),
  participantRouter = require("./app/api/v1/participants/router"),
  transactionRouter = require("./app/api/v1/transactions/router");

// Middleware
const notFoundMiddleware = require("./app/middlewares/not-found"),
  handlerError = require("./app/middlewares/handler-error");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to api semina" });
});

// Super Admin Middleware
app.use(`${versionV1}`, usersRouter);
app.use(`${versionV1}/auth`, authRouter);
app.use(`${versionV1}/categories`, categoriesRouter);
app.use(`${versionV1}/speakers`, speakerRouter);
app.use(`${versionV1}/events`, eventRouter);
app.use(`${versionV1}/payments`, paymentRouter);

// Participant Middleware
app.use(`${versionV1}`, participantRouter);
app.use(`${versionV1}/transactions`, transactionRouter);

// Middleware
app.use(notFoundMiddleware);
app.use(handlerError);

module.exports = app;
