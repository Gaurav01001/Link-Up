const asyncHandler = require("../utils/asyncHandler");
const { registerUser, loginUser } = require("../services/auth.service");


// Register
const register = asyncHandler(async (req, res) => {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({
        message: "User registered successfully",
        user,
        token,
    });
});

// Login
const login = asyncHandler(async (req, res) => {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({
        message: 'Login successful',
        user,
        token
    })
});


// Get current user (protected)
async function getMe(req, res) {
    res.status(200).json({ user: req.user });
}

module.exports = { register, login, getMe }
