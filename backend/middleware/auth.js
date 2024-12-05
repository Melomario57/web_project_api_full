const jwt = require("jsonwebtoken");
const Unauthorized = require("../errors/unauthorized-err");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization.startsWith("Bearer")) {
    throw new Unauthorized("Authorization required");
  }
  const token = authorization.replace("Bearer", "");
  let playload;

  try {
    playload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    throw new Unauthorized("Authorization required");
  }
  req.user = playload;
  next();
};
