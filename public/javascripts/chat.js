const socket = io();

const chatList = document.querySelector("#chatList");
const chatForm = document.querySelector("#chatForm");
const chatMsg = document.querySelector("#chatMsg");

const submitChat = () => {
  if (chatMsg.value) {
    socket.emit("message", {
      text: chatMsg.value,
      date: new Date(),
      name: getCookie("name"),
    });
    chatMsg.value = "";
  }
};

chatMsg.addEventListener("keypress", (event) => {
  if (event.which === 13 && !event.shiftKey) {
    event.preventDefault();
    submitChat();
  }
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitChat();
});

socket.on("message", (msg) => {
  const item = `
    <li>
      <div>
        <p>${msg.name}</p>
        <p>${fmtDate(msg.date)}</p>
      </div>
      <pre>${msg.text}</pre>
    </li>
  `;
  chatList.insertAdjacentHTML("beforeend", item);
});
