const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const server = http.createServer(app);
const router = require("./routes/index.js");
const cors = require("cors");
// const io = socketIo(server);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const CONECTION_URL =
  "mongodb+srv://StOne:1234@cluster0.hbmtxfn.mongodb.net/test";
const PORT = 27017;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/", router);

let userOn = [];
let userID = [];

io.on("connection", (socket) => {
  socket.on("addMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("addUserToList", (newUser) => {
    const allredyOn = userOn.filter(
      (onlineUser) => onlineUser.usuario === newUser.usuario
    );

    if (!allredyOn.length) {
      userID.push({id: socket.id, usuario: newUser.usuario});
      userOn.push(newUser);
    }
    console.log("-----> userOn", userOn);
    io.emit("updateUserList", userOn);
  });
  socket.on("requestUserList", () => {
    io.emit("getUserList", userOn);
  });
  socket.on("removeUserFromList", (disconnectedUser) => {
    userOn = userOn.filter(
      (onlineUser) => onlineUser.usario !== disconnectedUser.usario
    );
    io.emit("updateUserList", userOn);
  });
  socket.on("disconnect", () => {
    console.log("CONECCTION");
    const disconectUser = userID.filter((user) => user.id === socket.id).pop();
    if (disconectUser) {
      userOn = userOn.filter((user) => user.usario !== disconectUser.usario);
    }
  });
});

mongoose
  .connect(CONECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () => console.log(`Server is running on port  ${PORT}`))
  )
  .catch((err) => console.log("error mongooo---->", err.message));
