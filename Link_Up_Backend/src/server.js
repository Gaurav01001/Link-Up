const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prisma = require("./configs/prisma")
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});
//Test route to create users
app.get("/test-users", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      name: "Test-User",
      username: "ggstester123",
      email: "test@gmail.com",
      password: "12345",
    }

  });
  res.json(user)
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});