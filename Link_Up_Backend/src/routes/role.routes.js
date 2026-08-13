const express = require("express");
const router = express.Router();
const { getMyRolesController } = require("../controllers/role.controller");


const roleController = require("../controllers/role.controller");
const authentication = require("../middleware/auth.middleware");
const { applyRole, getApplicationsForRole } = require("../controllers/application.controller");

// create quest / list all quests
router.post("/", authentication, roleController.createRole);
router.get("/", roleController.getRoles);


router.get("/my", authentication, getMyRolesController);

// must be before /:id to avoid shadowing
router.get("/:id/applications", authentication, getApplicationsForRole);
router.post("/:id/apply", authentication, applyRole);

// single quest detail (public)
router.get("/:id", roleController.getRoleById);

router.put("/:id", authentication, roleController.updateRole);
router.delete("/:id", authentication, roleController.deleteRole);

module.exports = router;