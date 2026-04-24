const express = require("express");
const router = express.Router();

const roleController = require("../controllers/role.controller");
const auth = require("../middleware/auth.middleware");

// create role
router.post("/", auth, roleController.createRole);
router.get("/", roleController.getRoles);
router.put("/:id", auth, roleController.updateRole);
router.delete("/:id", auth, roleController.deleteRole);
module.exports = router;