const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const isEmail = require("validator/lib/isEmail");
const Unauthorized = require("../errors/unauthorized");

const regexUser = /(http:\/\/|https:\/\/)(www\.)*(\w+\._~:\/\?\/%#\[\]@!\$&'\(\)\*\+,;=)*\/*/gi;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorador",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator(v) {
        return regexUser.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new Unauthorized("Incorrect email or password")
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
