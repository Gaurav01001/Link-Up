const { z } =
  require("zod");

const searchSchema =
  z.object({

    q: z.string()
        .min(1)
        .max(50),

  });

module.exports = {
  searchSchema,
};