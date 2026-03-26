const jwt = require("jsonwebtoken")
const prisma = require("../config/prisma")

const authentication = async(req, res, next)=>{
   try{
    // read authorization head
    const authHeader = req.headers.authorization
    // check if header exists
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token provided"
        })
    }
    //extract token
    const token = authHeader.split(" ")[1]

    //verify tokens
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id
        }
    });
    //Attach user
    req.user = user
    next()
   
   } 
   catch(error){
    res.status(401).json({
        message: "Invalid or expired token"
    })
   }
}
module.exports = {authentication}