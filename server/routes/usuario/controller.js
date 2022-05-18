const express = require("express");
const {createUser, getUser} = require("./services");

const usersRouter = express.Router();

usersRouter.get("/", getUser);
usersRouter.post("/", createUser);

module.exports = usersRouter;
