const express = require("express")
const cors = require("cors");

const prisma = require("./config/prisma")
const errorHandler = require("./middleware/error.middleware")
const asyncHandler = require("./utils/asyncHandler")

const app =express();

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.json({message: "Backend Active !!"})
})

app.get(
    "/test-users",
    asyncHandler(async(req, res)=>{
        const user = await prisma.user.create({
            data:{
                name: "Test User",
                email: "test" +Date.now() +"@gmail.com",
                username: "tester" + Date.now(),
                password: "12345",
            }

        })
        res.json(user);
    })
)


app.use(errorHandler)
module.exports = app;
