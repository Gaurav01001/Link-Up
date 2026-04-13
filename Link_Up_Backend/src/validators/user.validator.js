const { z } = require("zod")

const updateProfileSchema = z.object({
    name: z
        .string()
        .max(50, 'Name must be under 50 characters')
        .min(5, 'Atleast 5 characters')
        .optional(),
    bio: z
        .string()
        .max(200, "Bio must be under 200 characters")
        .min(10, "write something")
        .optional(),
    username: z
        .string()
        .max(30, "Maximum 30 characters")
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
        .optional(),
});

const updateAvatarSchema = z.object({
    avatar: z
        .string({ required_error: "Avatar url is required" })
        .url('Avatar must have a valid url')
})

module.exports = { updateProfileSchema, updateAvatarSchema }