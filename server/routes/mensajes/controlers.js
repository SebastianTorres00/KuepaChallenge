const express = require("express");
const {savedMessage, getMessages} = require("./services");

const messagesRouter = express.Router();

messagesRouter.get("/", getMessages);
messagesRouter.post("/", savedMessage);

module.exports = messagesRouter;
