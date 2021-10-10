const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cookie = require("cookie");
const iconv = require("iconv-lite");
const port = process.env.PORT || 3000;

const players = {};

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("move", (move) => {
    if (!players[move.name]) {
      players[move.name] = { x: 200, y: 150 };
    }
    players[move.name].x += move.dx;
    players[move.name].y += move.dy;
    io.emit("move", players);
  });
});

http.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
