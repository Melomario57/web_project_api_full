const cardsRoute = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

cardsRoute.get("/cards", getCards);
cardsRoute.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard
);
cardsRoute.delete("/cards/:cardId", deleteCard);
cardsRoute.put("/cards/likes/:cardId", likeCard);
cardsRoute.delete("/cards/likes/:cardId", dislikeCard);

module.exports = cardsRoute;
