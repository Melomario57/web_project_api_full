const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/not-found-err");
const { NODE_ENV, JWT_SECRET } = process.env;
require("dotenv").config();

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError("User not found");
      }
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      res.json(user);
    })
    .catch((err) => res.status(400).send({ error: err.message }));
};

module.exports.getCurrentUser = (req, res) => {
  User.findOne(req.user).then((user) => {
    res.json(user);
  });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(201).json({ _id: user._id, email: user.email }))
      .catch((err) => res.status(400).send({ error: err.message }));
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.updateProfile = (req, res) => {
  const userId = req.user._id;
  const userData = req.body;
  User.findByIdAndUpdate(userId, userData)
    .orFail(() => {
      const error = new Error("Cannot update profile");
      error.statusCode = 400;
      throw error;
    })
    .then(() => {
      res.send({ message: "Profile updated" });
    })
    .catch((err) => {
      console.log("Profile Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .orFail(() => {
      const error = new Error("Cannot update Avatar");
      error.statusCode = 400;
      return error;
    })
    .then(() => {
      res.send({ message: "Avatar updated" });
    })
    .catch((err) => {
      console.log("Avatar Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};
