const express =
  require("express");

const router =
  express.Router();

const authentication = require(
  "../middleware/auth.middleware"
);

const {

  createReviewController,

  updateReviewController,

  deleteReviewController,

  getUserReviewsController,

  getUserAverageRatingController,

} = require(
  "../controllers/review.controller"
);

// create review
router.post(
  "/",
  authentication,
  createReviewController
);

// update review
router.put(
  "/:id",
  authentication,
  updateReviewController
);

// delete review
router.delete(
  "/:id",
  authentication,
  deleteReviewController
);

// get reviews of user
router.get(
  "/user/:id",
  authentication,
  getUserReviewsController
);

// get average rating
router.get(
  "/user/:id/rating",
  authentication,
  getUserAverageRatingController
);

module.exports = router;