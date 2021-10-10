const canvas = document.querySelector("#map");
const ctx = canvas.getContext("2d");
const W = 400;
const H = 300;

const line = (x1, y1, x2, y2, color = "#000000") => {
  const temp = ctx.strokeStyle;
  ctx.strokeStyle = color;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.strokeStyle = temp;
};

const rect = (x1, y1, x2, y2, color = "#000000") => {
  const temp = ctx.strokeStyle;
  ctx.strokeStyle = color;
  ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
  ctx.stroke();
  ctx.strokeStyle = temp;
};

const frect = (x1, y1, x2, y2, color = "#000000") => {
  const temp = ctx.fillStyle;
  ctx.fillStyle = color;
  ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
  ctx.fillStyle = temp;
};

const circle = (x, y, r, color = "#000000") => {
  const temp = ctx.strokeStyle;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = temp;
};

const fcircle = (x, y, r, color = "#000000") => {
  const temp = ctx.fillStyle;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = temp;
  ctx.stroke();
};

const ftext = (text, x, y, color = "#000000") => {
  const temp = ctx.fillStyle;
  ctx.fillStyle = color;
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(text, x, y);
  ctx.fillStyle = temp;
};

const render = (players) => {
  frect(0, 0, W, H, "#ffffff");
  Object.keys(players).forEach((name) => {
    const pos = players[name];
    fcircle(pos.x, pos.y, 13, "green");
    ftext(name, pos.x, pos.y - 20, "green");
  });
};

const content = document.querySelector("#content");
content.addEventListener("keydown", (event) => {
  const code = event.code;
  const dist = 5;
  if (code === "ArrowUp") {
    socket.emit("move", {
      name: getCookie("name"),
      dx: 0,
      dy: -dist,
    });
  } else if (code === "ArrowDown") {
    socket.emit("move", {
      name: getCookie("name"),
      dx: 0,
      dy: dist,
    });
  } else if (code === "ArrowLeft") {
    socket.emit("move", {
      name: getCookie("name"),
      dx: -dist,
      dy: 0,
    });
  } else if (code === "ArrowRight") {
    socket.emit("move", {
      name: getCookie("name"),
      dx: dist,
      dy: 0,
    });
  }
});

socket.on("move", (players) => {
  render(players);
});

socket.emit("move", {
  name: getCookie("name"),
  dx: 0,
  dy: 0,
});
