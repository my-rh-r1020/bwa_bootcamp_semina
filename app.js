const express = require("express"),
  app = express(),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan");

const versionV1 = "/api/v1",
  usersRouter = require("./app/api/v1/users/router"),
  authRouter = require("./app/api/v1/auth/router"),
  categoriesRouter = require("./app/api/v1/categories/router");

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

app.use(`${versionV1}`, usersRouter);
app.use(`${versionV1}/auth`, authRouter);
app.use(`${versionV1}/categories`, categoriesRouter);
// Middleware
app.use(notFoundMiddleware);
app.use(handlerError);

module.exports = app;
