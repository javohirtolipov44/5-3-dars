import express from "express";
import { Server } from "socket.io";

const app = express();

const server = app.listen(4000, () => {
  console.log("server is running 4000");
});

const io = new Server(server);

io.on("connection", (socket) => {
  const username = socket.handshake.headers.username;

  console.log(`${username} tarmoqqa qo'shildi`);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`${username} ${room} xonasiga qo'shildi`);
    io.to(room).emit("message", `${username} (${room}) xonasiga qo'shildi`);
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`${username} ${room} xonasidan chiqdi`);
    io.to(room).emit("message", `${username} (${room}) xonasidan chiqdi`);
  });

  socket.on("disconnect", () => {
    console.log(`${username} tarmoqdan shiqdi`);
  });
});
