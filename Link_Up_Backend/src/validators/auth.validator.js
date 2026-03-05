//zod -> Validates incoming data (is email valid? is password long enough?)

const {z} = require("zod");

const registerSchema = z.object({
    name : z.string().min(2, "Name must be 2 characters"),
    username: z.string().min(3, "username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be atleast 6 characters") 
})

module.exports = {
    registerSchema,
}