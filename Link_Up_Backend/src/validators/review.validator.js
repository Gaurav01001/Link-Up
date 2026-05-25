const { z } =
  require("zod");

const createReviewSchema =
  z.object({

    reviewedId:
      z.string().uuid(),

    rating:
      z.number()
       .min(1)
       .max(5),

    comment:
      z.string()
       .max(500)
       .optional(),

  });

const updateReviewSchema =
  z.object({

    rating:
      z.number()
       .min(1)
       .max(5),

    comment:
      z.string()
       .max(500)
       .optional(),

  });

module.exports = {
  createReviewSchema,
  updateReviewSchema,
};