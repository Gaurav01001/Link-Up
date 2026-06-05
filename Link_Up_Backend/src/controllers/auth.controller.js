const asyncHandler = require("../utils/asyncHandler");
const { registerUser, loginUser, requestPasswordReset, resetUserPassword } = require("../services/auth.service");


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

// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    await requestPasswordReset(email);
    res.status(200).json({
        success: true,
        message: "If a matching account is found, a password reset link has been sent to your email."
    });
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;
    await resetUserPassword(token, password);
    res.status(200).json({
        success: true,
        message: "Password has been successfully reset."
    });
});

module.exports = { register, login, getMe, forgotPassword, resetPassword }

