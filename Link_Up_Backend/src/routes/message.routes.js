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
  sendMessage,
  getConversationMessages,
} = require(
  "../controllers/message.controller"
);

router.post(
  "/",
  authentication,
  validate(sendMessageSchema),
  sendMessage
);

router.get(
  "/:userId",
  authentication,
  getConversationMessages
);

module.exports = router;