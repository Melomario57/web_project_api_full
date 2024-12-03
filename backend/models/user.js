const mongoose = require("mongoose");
const regexUser =
  /(http:\/\/|https:\/\/)(www\.)*(\w+\._~:\/\?\/%#\[\]@!\$&'\(\)\*\+,;=)*\/*/gi;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "User avatar is required"],
    validate: {
      validator(v) {
        return regexUser.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
