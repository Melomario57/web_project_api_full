const usersRoute = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

usersRoute.get("/users", getUsers);
usersRoute.post("/users", createUser);
usersRoute.patch("/users/me", updateProfile);
usersRoute.patch("/users/me/avatar", updateAvatar);
usersRoute.get("/users/:userId", getUserById);
module.exports = usersRoute;
