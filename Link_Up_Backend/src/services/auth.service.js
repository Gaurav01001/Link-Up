/* What this file does: Contains the actual LOGIC. Controllers handle HTTP stuff (req, res). Services handle BUSINESS stuff (hash password, check duplicates, create user).

Why separate? If tomorrow you want to create a user from a different place (like an admin panel or a script), you reuse the service. The logic isn't trapped inside a route handler. */

const bcrypt = require("bcrypt")
const crypto = require("crypto")
const prisma = require("../config/prisma")
const {generateToken} = require("../utils/jwt")
const {sendResetEmail} = require("../utils/email")

const registerUser = async(data)=>{
    let {name, username, email, password} = data;

    if (!username) {
        // Auto-generate username from email if not provided
        const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '');
        username = baseUsername + Math.floor(Math.random() * 10000);
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                {email},
            {username}
        ]
        }
    })

    if(existingUser){
        const err = new Error("Username or email already exists");
        err.status = 409;
        throw err;
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            username,
            password: hashedPassword,
        },
        select:{
            id: true,
            email: true,
            username: true,
            name: true,
            createdAt: true
        }
    })
    //generate jwt token
    const token = generateToken(user.id);
    return{user, token}
}

const loginUser = async(data)=>{
    const {email, password} = data;
    
    const probablyexists = await prisma.user.findUnique({
        where:{email}
    });

    // If account exists, check for lockout
    if (probablyexists && probablyexists.lockoutUntil && probablyexists.lockoutUntil > new Date()) {
        throw { status: 401, message: "Too many failed login attempts. Please try again later." }
    }

    // Dummy hash for timing attack mitigation
    const dummyHash = "$2b$10$abcdefghijklmnopqrstuvwxyzaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

    if(!probablyexists){
        // Simulate password verification delay
        await bcrypt.compare(password, dummyHash);
        throw {status: 401, message: "Wrong email or password"}
    }

    // compare passwords
    const matched = await bcrypt.compare(password, probablyexists.password)

    if(!matched){
        const newFailedAttempts = probablyexists.failedLoginAttempts + 1;
        let lockoutUntil = null;
        
        if (newFailedAttempts >= 5) {
            lockoutUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        }

        await prisma.user.update({
            where: { id: probablyexists.id },
            data: {
                failedLoginAttempts: newFailedAttempts,
                lockoutUntil
            }
        });

        if (newFailedAttempts >= 5) {
            throw { status: 401, message: "Too many failed login attempts. Please try again later." }
        } else {
            throw { status: 401, message: "Wrong email or password" }
        }
    }

    // Successful login -> Reset lockout and failed attempts
    await prisma.user.update({
        where: { id: probablyexists.id },
        data: {
            failedLoginAttempts: 0,
            lockoutUntil: null
        }
    });

    const token = generateToken(probablyexists.id);
    const { password: _, failedLoginAttempts: __, lockoutUntil: ___, resetPasswordToken: ____, resetPasswordExpires: _____, ...userWithoutPassword } = probablyexists;

    return { user: userWithoutPassword, token }
}

const requestPasswordReset = async (email) => {
    if (!email) {
        throw { status: 400, message: "Email is required" };
    }

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        // Do not reveal whether email exists, return successfully.
        return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetPasswordToken: resetToken,
            resetPasswordExpires: resetExpires
        }
    });

    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;
    console.log(`[PASSWORD RESET LINK for ${email}]: ${resetUrl}`);

    await sendResetEmail(email, resetUrl);
};

const resetUserPassword = async (token, newPassword) => {
    if (!token || !newPassword) {
        throw { status: 400, message: "Token and password are required" };
    }

    const user = await prisma.user.findUnique({
        where: { resetPasswordToken: token }
    });

    if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
        throw { status: 400, message: "Invalid or expired password reset token" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
            failedLoginAttempts: 0,
            lockoutUntil: null
        }
    });
};

module.exports = {
    registerUser,
    loginUser,
    requestPasswordReset,
    resetUserPassword
}

