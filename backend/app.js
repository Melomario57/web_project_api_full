const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
app.use(bodyParser.json());
const { celebrate, Joi, errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { login, createUser } = require("./controllers/users");
const auth = require("./middleware/auth");
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "/")));

const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(requestLogger);

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
    }),
  }),
  createUser
);

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

Joi.string().required().custom(validateUrl);

app.use(auth);

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
