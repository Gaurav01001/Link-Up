const express = require("express")
const { register, login, getMe } = require("../controllers/auth.controller")
const authentication = require("../middleware/auth.middleware")

const router = express.Router()


router.post("/register", register)
router.post("/login", login)
router.get("/me", authentication, getMe)
route.post("/:id", authentication, roleController.updateRole)
module.exports = router