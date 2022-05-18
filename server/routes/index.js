const express = require("express");
const messagesRouter = require("./mensajes/controlers");
const usersRouter = require("./usuario/controller");

const router = express.Router();

router.use("/messages", messagesRouter);
router.use("/users", usersRouter);

module.exports = router;
