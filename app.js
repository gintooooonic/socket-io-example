const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});

http.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
