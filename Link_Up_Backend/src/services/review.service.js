const prisma =
    require("../config/prisma");

const createReview = async (
    reviewerId,
    reviewedId,
    rating,
    comment
) => {

    // prevent self review
    if (
        reviewerId === reviewedId
    ) {
        throw new Error(
            "You cannot review yourself"
        );
    }

    // check reviewer exists
    const reviewer =
        await prisma.user.findUnique({
            where: {
                id: reviewerId,
            },
        });

    if (!reviewer) {
        throw new Error(
            "Reviewer not found"
        );
    }

    // check reviewed user exists
    const reviewed =
        await prisma.user.findUnique({
            where: {
                id: reviewedId,
            },
        });

    if (!reviewed) {
        throw new Error(
            "Reviewed user not found"
        );
    }

    // check accepted connection
    const connection =
        await prisma.connection.findFirst({

            where: {

                OR: [

                    {
                        requesterId: reviewerId,
                        receiverId: reviewedId,
                    },
                    {
                        requesterId: reviewedId,
                        receiverId: reviewerId,
                    },

                ],

                status: "ACCEPTED",

            },

        });

    // users must be connected
    if (!connection) {

        throw new Error(
            "You can only review connected users"
        );

    }

    // prevent duplicate reviews
    const existingReview =
        await prisma.review.findFirst({

            where: {
                reviewerId,
                reviewedId,
            },

        });

    if (existingReview) {

        throw new Error(
            "You already reviewed this user"
        );

    }

    // create review
    const review =
        await prisma.review.create({

            data: {
                reviewerId,
                reviewedId,
                rating,
                comment,
            },

        });

    return review;
};
const updateReview = async (
    reviewId,
    userId,
    rating,
    comment
) => {

    // check review exists
    const review =
        await prisma.review.findUnique({

            where: {
                id: reviewId,
            },

        });

    if (!review) {

        throw new Error(
            "Review not found"
        );

    }

    // ownership check
    if (
        review.reviewerId !== userId
    ) {

        throw new Error(
            "Unauthorized"
        );

    }

    // update review
    const updatedReview =
        await prisma.review.update({

            where: {
                id: reviewId,
            },

            data: {
                rating,
                comment,
            },

        });

    return updatedReview;
};
const deleteReview = async (
    reviewId,
    userId
) => {

    // check review exists
    const review =
        await prisma.review.findUnique({

            where: {
                id: reviewId,
            },

        });

    if (!review) {

        throw new Error(
            "Review not found"
        );

    }

    // ownership check
    if (
        review.reviewerId !== userId
    ) {

        throw new Error(
            "Unauthorized"
        );

    }

    // delete review
    const deletedReview =
        await prisma.review.delete({

            where: {
                id: reviewId,
            },

        });

    return deletedReview;
};

const getUserReviews = async (userId) => {

    const reviews =
        await prisma.review.findMany({

            where: {
                reviewedId: userId,
            },

            include: {

                reviewer: {

                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatar: true,
                    },

                },

            },

            orderBy: {
                createdAt: "desc",
            },

        });

    return reviews;
};
const getUserAverageRating = async (userId) => {

    const reviews =
        await prisma.review.findMany({

            where: {
                reviewedId: userId,
            },

        });

    if (reviews.length === 0) {
        return 0;
    }

    const totalRating =
        reviews.reduce((sum, review) => sum + review.rating, 0);

    return totalRating / reviews.length;
};

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    getUserReviews,
    getUserAverageRating
};