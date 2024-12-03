const express = require("express");
const mongoose = require("mongoose");

const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "/")));

const { PORT = 3000 } = process.env;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use((req, res, next) => {
  req.user = {
    _id: "672958d9135aa529a2380464",
  };

  next();
});

app.use("/", cardsRoute);
app.use("/", usersRoute);

app.use("", (req, res) => {
  res.status(404).send({ message: "The request url is invalid" });
});
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
