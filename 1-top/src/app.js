import express from "express";
import { Server } from "socket.io";

const app = express();

const server = app.listen(4000, () => {
  console.log("server is running 4000");
});

const io = new Server(server);

function getTime() {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tashkent",
  };
  return new Date().toLocaleString("uz-UZ", options);
}
let count = 0;
io.on("connection", (socket) => {
  const username = socket.handshake.headers.username;
  count += 1;
  io.emit("online", `Foydalanuvchilar soni: (${count})`);

  socket.on("disconnect", () => {
    count -= 1;
    io.emit("offline", `Foydalanuvchilar soni: (${count})`);
  });
});
