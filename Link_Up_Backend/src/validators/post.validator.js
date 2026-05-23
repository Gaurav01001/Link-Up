const {z} = require("zod");

const createpostSchema = z.object({
    content: z.string()
    .min(1, "Content is Required")
    .max(1000, "Content too long!"),
    
})

module.exports = {
    createpostSchema
}

