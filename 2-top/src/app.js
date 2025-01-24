import express from "express";
import { Server } from "socket.io";

const app = express();

const server = app.listen(4000, () => {
  console.log("server is running 4000");
});

const io = new Server(server);

io.on("connection", (socket) => {
  const username = socket.handshake.headers.username;

  console.log(`${username} ulanishi boshlandi`);

  // Xonaga qo'shilish
  socket.on("joinRoom", (room) => {
    socket.join(room); // Xonaga qo'shish
    console.log(`${username} ${room} xonasiga qo'shildi`);

    // Xonadagi barcha foydalanuvchilarga xabar yuborish
    io.to(room).emit("message", `${username} xonaga qo'shildi (${room})`);
  });

  // Xonadan chiqish
  socket.on("leaveRoom", (room) => {
    socket.leave(room); // Xonadan chiqish
    console.log(`${username} ${room} xonasidan chiqdi`);

    // Xonadagi barcha foydalanuvchilarga xabar yuborish
    io.to(room).emit("message", `${username} xonadan chiqdi (${room})`);
  });

  // Client uzilganda
  socket.on("disconnect", () => {
    console.log(`${username} ulanishi uzildi`);
  });
});
