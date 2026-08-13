const express = require("express");
const router = express.Router();
const { getProfile, editProfile, changeAvatar } = require("../controllers/user.controller");
const authentication = require("../middleware/auth.middleware");


//static route first
// PUT /users/profile    → edit profile (protected)
router.put("/profile", authentication, editProfile);

// PUT /users/avatar     → update avatar (protected)
router.put("/avatar", authentication, changeAvatar);

//dynamic route last
// GET /users/:username  → view profile (public)
router.get("/:username", getProfile);
/* Rule of thumb: In Express, always put static paths (/profile, /avatar) before dynamic params (/:username). Even if the HTTP methods don't conflict today, it prevents bugs if you ever add a GET /users/profile or GET /users/settings route later. */
module.exports = router;
