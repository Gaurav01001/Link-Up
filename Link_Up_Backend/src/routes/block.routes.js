const express =
  require("express");

const router =
  express.Router();

const authentication = require(
  "../middleware/auth.middleware"
);

const {

  blockUserController,

  unblockUserController,

  getBlockedUsersController,

  getBlockedByUsersController,

} = require(
  "../controllers/block.controller"
);

// block user
router.post(
  "/",
  authentication,
  blockUserController
);

// unblock user
router.delete(
  "/",
  authentication,
  unblockUserController
);

// users current user blocked
router.get(
  "/blocked-users",
  authentication,
  getBlockedUsersController
);

// users who blocked current user
router.get(
  "/blocked-by",
  authentication,
  getBlockedByUsersController
);

module.exports = router;