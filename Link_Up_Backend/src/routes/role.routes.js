const express = require("express");
const router = express.Router();

const roleController = require("../controllers/role.controller");
const auth = require("../middleware/auth.middleware");
const { applyRole, getApplicationsForRole } = require("../controllers/application.controller");

// create role
router.post("/", auth, roleController.createRole);

router.get("/", roleController.getRoles);
router.get("/:id/applications", auth, getApplicationsForRole);
router.post("/:id/apply", auth, applyRole);

router.put("/:id", auth, roleController.updateRole);
router.delete("/:id", auth, roleController.deleteRole);

module.exports = router;