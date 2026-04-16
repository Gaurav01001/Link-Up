const express = require("express")
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const roleRouter = require("./routes/role.routes")
// const prisma = require("./config/prisma")
const errorHandler = require("./middleware/error.middleware")
// const asyncHandler = require("./utils/asyncHandler")
const userRouter = require("./routes/user.routes")
const app = express();

app.use(cors())
app.use(express.json())
app.use("/auth", authRouter);
app.use("/roles", roleRouter);
app.use('/users', userRouter);
app.get("/", (req, res) => {
    res.json({ message: "IDK it's running ig" })
})


module.exports = app;
/*
GET  /users/:username  → view profile
PUT  /users/profile    → edit profile
PUT  /users/avatar     → update avatar
*/


