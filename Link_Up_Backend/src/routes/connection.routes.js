const express = require("express");

const router = express.Router();

const { validate } = require(
  "../middleware/validator.middleware"
);

const {
  createConnectionRequestSchema,
  updateConnectionRequestSchema,
} = require(
  "../validators/connection.validator"
);

const authentication = require(
  "../middleware/auth.middleware"
);

const {
  sendRequest,
  updateRequest,
  getConnections,
  getPendingRequest,
} = require(
  "../controllers/connection.controller"
);

// send connection request
router.post(
  "/request",
  authentication,
  validate(createConnectionRequestSchema),
  sendRequest
);

// accept/reject request
router.patch(
  "/:id",
  authentication,
  validate(updateConnectionRequestSchema),
  updateRequest
);

// get accepted connections
router.get(
  "/",
  authentication,
  getConnections
);

// get pending requests
router.get(
  "/pending",
  authentication,
  getPendingRequest
);

module.exports = router; 