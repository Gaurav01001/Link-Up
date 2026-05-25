const { z } = require("zod");

const reportSchema = z.object({

  reportedId: z
    .string()
    .min(1, "Reported ID is required"),

  reason: z
    .string()
    .min(1, "Reason is required")
    .max(100),

  description: z
    .string()
    .min(1, "Description is required")
    .max(500),

});

module.exports = {
  reportSchema,
};
