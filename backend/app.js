const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const allowedCors = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://backhack.chickenkiller.com",
  "https://www.backhack.chickenkiller.com",
  "https://api.backhack.chickenkiller.com",
];

const corsOptions = { origin: allowedCors };

app.use(cors(corsOptions));

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    const requestHeaders = req.headers["access-control-request-headers"];
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  next();
});

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

mongoose.connect("mongodb://localhost:27017/mariodb");

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("The server is going to fall");
  }, 0);
});

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
