const express = require("express");
const { register, login, getMe } = require("../controllers/auth.controller");
const authentication = require("../middleware/auth.middleware");
const { authLimiter } = require("../middleware/rateLimit.middleware");
const { validate } = require("../middleware/validator.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const router = express.Router();

router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  register
);
router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  login
);
router.get("/me", authentication, getMe);
module.exports = router;