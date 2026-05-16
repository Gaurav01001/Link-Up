const { z } = require("zod");

const createConnectionRequestSchema = z.object({
  receiverId: z.string({ required_error: "Receiver ID is required" }).uuid("Invalid User ID format")
});

const updateConnectionRequestSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED"], { required_error: "Status is required", invalid_type_error: "Status must be ACCEPTED or REJECTED" })
});

module.exports = {
  createConnectionRequestSchema,
  updateConnectionRequestSchema
};