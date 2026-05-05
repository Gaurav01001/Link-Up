const express = require("express")
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const roleRouter = require("./routes/role.routes")
const errorHandler = require("./middleware/error.middleware")
const userRouter = require("./routes/user.routes")
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json({ message: "Link_Up Backend is running!" })
})

app.use("/auth", authRouter);
app.use("/roles", roleRouter);
app.use('/users', userRouter);

// Global error handler — must be LAST
app.use(errorHandler);
app.post("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.json({ message: "POST working" });
});
module.exports = app;

/*
GET  /users/:username  → view profile
PUT  /users/profile    → edit profile
PUT  /users/avatar     → update avatar
*/


