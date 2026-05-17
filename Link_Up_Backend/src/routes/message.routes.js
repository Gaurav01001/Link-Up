const express = require("express");

const router = express.Router();

const authentication = require(
  "../middleware/auth.middleware"
);

const {
  validate,
} = require(
  "../middleware/validator.middleware"
);

const {
  sendMessageSchema,
} = require(
  "../validators/message.validator"
);

const {
  createMessage,
  getConversationMessages,
} = require(
  "../controllers/message.controller"
);

router.post(
  "/",
  authentication,
  validate(sendMessageSchema),
  createMessage
);

router.get(
  "/:userId",
  authentication,
  getConversationMessages
);

module.exports = router;