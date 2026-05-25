const { z } =
  require("zod");

const blockSchema =
  z.object({

    blockedId:
      z.string()
       .uuid(
         "Invalid user ID"
       ),

  });

module.exports = {
  blockSchema,
};