const mongoose = require("mongoose");
const regexCard =
  /(http:\/\/|https:\/\/)(www\.)*(\w+\._~:\/\?\/%#\[\]@!\$&'\(\)\*\+,;=)*\/*/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, "Link image is required"],
    validate: {
      validator(v) {
        return regexCard.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("card", cardSchema);
