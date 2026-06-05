//zod -> Validates incoming data (is email valid? is password long enough?)

const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(2, "Name must be 2 characters"),
  username: z.string().min(3, "username must be at least 3 characters").optional(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be atleast 6 characters")
})
const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  password: z
    .string({ required_error: 'Password is required' }),
});

const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
});

const resetPasswordSchema = z.object({
  token: z
    .string({ required_error: 'Token is required' })
    .min(1, 'Token is required'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
}