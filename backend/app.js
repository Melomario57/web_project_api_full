const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const { celebrate, Joi, errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { login, createUser } = require("./controllers/users");
const auth = require("./middleware/auth");

require("dotenv").config();

app.use(express.static(path.join(__dirname, "/")));

const cors = require("cors");

app.use(cors());
app.options("*", cors());

const allowedCors = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://myweb.centralpto.com",
  "https://www.myweb.centralpto.com",
];

app.use(cors({ origin: allowedCors }));

app.use(express.json());

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/mariodb");

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("The server is going to fall");
  }, 0);
});

const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");

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
      name: Joi.string().optional(),
      about: Joi.string().optional(),
      avatar: Joi.string().optional(),
    }),
  }),
  createUser
);

app.use(auth);

app.use("/", usersRoute);
app.use("/", cardsRoute);

app.use(errorLogger);

app.use(errors());

app.use("", (req, res) => {
  res.status(404).send({ message: "The request url is invalid" });
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}...`);
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).send({
    err,
    message:
      statusCode === 500 ? "An internal server error has ocurred" : message,
  });
});
