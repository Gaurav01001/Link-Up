const express = require("express")
const route = express.Router();

const authentication = require("../middleware/auth.middleware")
const {searchUsersController} = require("../controllers/search.controller")

route.get("/", authentication, searchUsersController);

module.exports = route