// STEP 1: Import asyncHandler utility
const asyncHandler = require("../utils/asyncHandler")


// STEP 2: Import registerUser function from auth.service
const {registerUser} = require("../services/auth.service")
// STEP 3: Import registerSchema from auth.validator
const {registerSchema} = require("../validators/auth.validator")
const { message } = require("../config/prisma")
// STEP 4: Create a controller function called "register"
// This function should be wrapped with asyncHandler
// The function should receive (req, res)
const register= asyncHandler(async(req, res)=>{
// STEP 5: Inside the function, validate the incoming request body
// Use registerSchema.parse(req.body)
// Store the validated data in a variable
const validate = registerSchema.parse(req.body)
// STEP 6: Call registerUser service
// Pass the validated data to it
// Destructure the returned result into user and token
const {user, token} = await registerUser(validatedData);
// STEP 7: Send response back to client
// Use res.status(201)
// Return JSON containing:
// message
// user
// token
res.status(201).json({
    message: "User registerd Successfully",
    user,
    token,
});
});
// STEP 8: Export the register controller so routes can use it
module.exports = {register}






