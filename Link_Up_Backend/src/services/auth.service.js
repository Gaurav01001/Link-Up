/* What this file does: Contains the actual LOGIC. Controllers handle HTTP stuff (req, res). Services handle BUSINESS stuff (hash password, check duplicates, create user).

Why separate? If tomorrow you want to create a user from a different place (like an admin panel or a script), you reuse the service. The logic isn't trapped inside a route handler. */

const bcrypt = require("bcrypt")
const prisma = require("../config/prisma")
const {generateToken} = require("../utils/jwt")

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
    if(!probablyexists){
        throw {status: 401, message: "User not found"}
    }
    // compare passwords
    const matched = await bcrypt.compare(password, probablyexists.password)
//password → plain text user entered
// probablyexists.password → hashed password from DB
    if(!matched){
        throw{status: 401, message: "Wrong email or password"}
    }

    const token = generateToken(probablyexists.id);

   const { password: _, ...userWithoutPassword } = probablyexists

    return { user: userWithoutPassword, token }
}

module.exports = {
    registerUser,
    loginUser
}

