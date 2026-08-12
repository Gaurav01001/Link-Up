const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth.middleware");
const { createPostController, getPostsController, updatePostController, deletePostController } = require("../controllers/post.controller");
const { createpostSchema } = require("../validators/post.validator");
const { validate } = require("../middleware/validator.middleware");

router.post("/create", authentication, validate(createpostSchema), createPostController);
router.get("/",  getPostsController);
router.put("/:id", authentication, validate(createpostSchema), updatePostController);
router.delete("/:id", authentication, deletePostController);

module.exports = router;
