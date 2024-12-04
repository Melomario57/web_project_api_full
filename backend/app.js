const express = require("express");
const mongoose = require("mongoose");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
const app = express();
require("dotenv").config();

const path = require("path");
app.use(express.static(path.join(__dirname, "/")));

const { PORT = 3000 } = process.env;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use((req, res, next) => {
  req.user = {
    _id: "672958d9135aa529a2380464",
  };

  next();
});

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/", usersRoute);
app.use("/", cardsRoute);

app.use("", (req, res) => {
  res.status(404).send({ message: "The request url is invalid" });
});
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
