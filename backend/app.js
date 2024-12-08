const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const validator = require("validator");
const cors = require("cors");
app.use(cors());
app.options("*", cors());

const allowedCors = ["localhost:3000"];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  next();
});

app.use(bodyParser.json());
const { celebrate, Joi, errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");
const {
  login,
  createUser,
  updateProfile,
  updateAvatar,
} = require("./controllers/users");
const auth = require("./middleware/auth");
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "/")));

const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mariodb");

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("The server is going to fall down");
  }, 0);
});

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string(),
      about: Joi.string(),
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  createUser
);

app.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string(),
      about: Joi.string(),
    }),
  }),
  updateProfile
);

app.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar
);

/* app.use(auth); */

app.use("/", usersRoute);
app.use("/", cardsRoute);

app.use(errorLogger);

app.use(errors());

app.use("", (req, res) => {
  res.status(404).send({ message: "The request url is invalid" });
});
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}...`);
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An internal server error has ocurred" : message,
  });
});
