const asyncHandler = require("../utils/asyncHandler");
const { registerUser, loginUser } = require("../services/auth.service");


// Register
const register = asyncHandler(async (req, res) => {
    console.log('[controller.register] HIT — body:', JSON.stringify({ ...req.body, password: '***' }));
    const { user, token } = await registerUser(req.body);
    console.log('[controller.register] SUCCESS — user:', user.email);
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
    // eslint-disable-next-line no-unused-vars
    const { password, ...userWithoutPassword } = req.user;
    res.status(200).json({ user: userWithoutPassword });
}

module.exports = { register, login, getMe }
