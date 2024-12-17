const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(403).send({ message: "Authorization is required." });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET || "dev-secret");
  } catch (err) {
    return res
      .status(403)
      .send({ message: "Authorization is required, invalid token", err });
  }

  req.user = payload;

  next();
};
