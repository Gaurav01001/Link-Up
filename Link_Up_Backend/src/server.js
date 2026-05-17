require("dotenv").config();//Loads environment variables

const app = require("./app");

const PORT = process.env.PORT || 5000;

const http = require("http");

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {

  console.log("User connected");

});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`
  );
});

// error handlers
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:",
    err
  );
});

process.on("unhandledRejection", (err) => {
  console.error(
    "UNHANDLED REJECTION:",
    err
  );
});

console.log(
  "THIS SERVER FILE IS RUNNING"
);