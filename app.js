const express = require("express"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan");

const usersRouter = require("./app/api/v1/users/router"),
  app = express(),
  versionV1 = "/api/v1";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to api semina" });
});

app.use(`${versionV1}`, usersRouter);

module.exports = app;
