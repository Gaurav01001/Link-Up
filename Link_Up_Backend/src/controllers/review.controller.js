const { createReview,
    updateReview,
    deleteReview,
    getUserReviews,
    getUserAverageRating }
    = require("../services/review.service");
    
const createReviewController = async (req, res) => {
    try {
        const { reviewedId, rating, comment } = req.body;
        const reviewerId = req.user.id;
        const review = await createReview(reviewerId, reviewedId, rating, comment);
        res.status(201).json({ message: "Review created successfully", review });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to create review" });
    }
}
const updateReviewController = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const reviewerId = req.user.id;
        const reviewId = req.params.id;
        const review = await updateReview(reviewId, reviewerId, rating, comment);
        res.status(200).json({ message: "Review updated successfully", review });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to update review" });
    }
}
const deleteReviewController = async (req, res) => {
    try {
        const reviewerId = req.user.id;
        const reviewId = req.params.id;
        const review = await deleteReview(reviewId, reviewerId);
        res.status(200).json({ message: "Review deleted successfully", review });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to delete review" });
    }
}
const getUserReviewsController = async (req, res) => {
    try {
        const userId = req.params.id;
        const reviews = await getUserReviews(userId);
        res.status(200).json({ message: "Reviews fetched successfully", reviews });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to fetch reviews" });
    }
}
const getUserAverageRatingController = async (req, res) => {
    try {
        const userId = req.params.id;
        const averageRating = await getUserAverageRating(userId);
        res.status(200).json({ message: "Average rating fetched successfully", averageRating });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to fetch average rating" });
    }
}
module.exports = {
    createReviewController,
    updateReviewController,
    deleteReviewController,
    getUserReviewsController,
    getUserAverageRatingController
}