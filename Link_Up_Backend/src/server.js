
require("dotenv").config();

const app = require("./app");

const PORT =
  process.env.PORT || 5000;

const http = require("http");

const { Server } =
  require("socket.io");

const server =
  http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  },
});
const jwt = require("jsonwebtoken");
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("Authentication Required"));
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decode.id;
    next();
  } catch (err) {
    return next(new Error("Invalid or Expiered Token"));
  }
})
const onlineUsers = {};
app.set('io', io);
app.set('onlineUsers', onlineUsers);

io.on("connection", (socket) => {

  console.log("User connected");

  // user joins
  // Use the verified userId from JWT — no client input needed
  onlineUsers[socket.userId] = socket.id;
  console.log("User joined:", socket.userId);

  // You don't need any send_message listener in server.js anymore.
  /* 
  connect
     ↓
  join(userId)
     ↓
  onlineUsers[userId] = socket.id
     ↓
  disconnect → remove user
  
  And your controller handles message delivery:
  
  POST /messages
       ↓
  message.service
       ↓
  Prisma saves message
       ↓
  controller gets saved message
       ↓
  io.to(receiverSocketId)
       ↓
  "receive_message"
  */
  // realtime messaging
  // socket.on(
  //   "send_message", async (data) => {

  //     const {
  //       senderId,
  //       receiverId,
  //       content,
  //     } = data;
  //     // const message = await prisma.message.create({
  //     //   data: {
  //     //     senderId,
  //     //     receiverId,
  //     //     content,
  //     //   }
  //     // });
  //     const receiverSocketId =
  //       onlineUsers[receiverId];

  //     console.log(
  //       receiverSocketId
  //     );

  //     // send to receiver
  //     if (receiverSocketId) {

  //       io.to(receiverSocketId).emit("receive_message", message);

  //     }

  //   }
  // );

  socket.on("disconnect", () => {

    console.log("User disconnected");

    for (const userId in onlineUsers) {

      if (
        onlineUsers[userId] === socket.id
      ) {

        delete onlineUsers[userId];

        break;
      }
    }
  });

});

server.listen(PORT, () => {

  console.log(
    `Server is running on port ${PORT}`
  );

});

// error handlers
process.on(
  "uncaughtException",
  (err) => {

    console.error(
      "UNCAUGHT EXCEPTION:",
      err
    );

  }
);

process.on(
  "unhandledRejection",
  (err) => {

    console.error(
      "UNHANDLED REJECTION:",
      err
    );

  }
);

console.log(
  "THIS SERVER FILE IS RUNNING"
);