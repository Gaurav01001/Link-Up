const { z } = require("zod");

const updateApplicationSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED", "PENDING"], { 
    required_error: "Status is required",
    invalid_type_error: "Invalid status value"
  })
});

module.exports = {
  updateApplicationSchema
};