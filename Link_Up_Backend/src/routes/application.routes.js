const express = require("express")

const router = express.Router();
// import authmiddleware
const authentication = require('../middleware/auth.middleware')

const { updateApplication, getMyApplications } = require("../controllers/application.controller")

// GET /api/applications/my — applicant sees their own submitted applications
router.get("/my", authentication, getMyApplications)

// PATCH /api/applications/:id — host accepts or rejects an application
router.patch("/:id", authentication, updateApplication)

module.exports = router;
