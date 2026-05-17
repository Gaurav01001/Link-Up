const express = require("express");
const router = express.Router();

const roleController = require("../controllers/role.controller");
const authentication = require("../middleware/auth.middleware");
const { applyRole, getApplicationsForRole } = require("../controllers/application.controller");

// create role
router.post("/", authentication, roleController.createRole);

router.get("/", roleController.getRoles);
router.get("/:id/applications", authentication, getApplicationsForRole);
router.post("/:id/apply", authentication, applyRole);

router.put("/:id", authentication, roleController.updateRole);
router.delete("/:id", authentication, roleController.deleteRole);

module.exports = router;