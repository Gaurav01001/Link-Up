const express = require("express");
const router = express.Router();
const { getProfile, editProfile, changeAvatar } = require("../controllers/user.controller");
const authentication = require("../middleware/auth.middleware");

// GET /users/:username  → view profile (public)
router.get("/:username", getProfile);

// PUT /users/profile    → edit profile (protected)
router.put("/profile", authentication, editProfile);

// PUT /users/avatar     → update avatar (protected)
router.put("/avatar", authentication, changeAvatar);

module.exports = router;
