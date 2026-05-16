const express = require("express")

const router = express.Router();
// import authmiddleware
const authentication = require('../middleware/auth.middleware')

const { updateApplication } = require("../controllers/application.controller")

router.patch("/:id", authentication, updateApplication)

module.exports = router;

