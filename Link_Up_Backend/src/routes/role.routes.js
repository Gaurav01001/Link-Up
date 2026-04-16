const express = require("express");
const router = express.Router();

const roleController = require("../controllers/role.controller");
const auth = require("../middleware/auth.middleware");

// create role
router.post("/", auth, roleController.createRole);

// get roles
router.get("/", roleController.getRoles);

module.exports = router;