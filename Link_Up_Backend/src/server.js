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
    origin: "*",
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {

  console.log("User connected");

  // user joins
  socket.on("join", (userId) => {

    onlineUsers[userId] =
      socket.id;

    console.log(
      "User joined:",
      userId
    );

  });

  // realtime messaging
  socket.on(
    "send_message",
    (data) => {

      const {
        senderId,
        receiverId,
        content,
      } = data;

      const receiverSocketId =
        onlineUsers[receiverId];

      console.log(
        receiverSocketId
      );

      // send to receiver
      if (receiverSocketId) {

        io.to(receiverSocketId)
          .emit(
            "receive_message",
            {
              senderId,
              content,
            }
          );

      }

    }
  );

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