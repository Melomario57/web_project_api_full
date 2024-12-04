const usersRoute = require("express").Router();
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

usersRoute.get("/users", getUsers);
usersRoute.get("/users/me", getCurrentUser);
usersRoute.patch("/users/me", updateProfile);
usersRoute.patch("/users/me/avatar", updateAvatar);
usersRoute.get("/users/:userId", getUserById);
module.exports = usersRoute;
