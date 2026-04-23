const prisma = require('../config/prisma');

//fields we will save and return  
const publicUserSelect = {
    id: true,
    email: true,
    username: true,
    name: true,
    bio: true,
    avatar: true,
    createdAt: true,
};

async function getUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: {username},
        select: publicUserSelect

    })
    if(!user){
        throw {status: 404, message: 'User not found'};
    }
    return user;
}

async function updateProfile(userId, data) {
    if(data.username){
        const existing = await prisma.user.findUnique({
            where: {username : data.username}
        })

        //some else have same username 
        if(existing && existing.id != userId){
            throw{status: 409, message: 'Username alrady taken'};
        }
    }

    const updateUser = await prisma.user.update({
        where: {id: userId},
        data,
        select : publicUserSelect
    })
    return updateUser;
}

async function updateAvatar(userId, avatar) {
    const updatedUser = await prisma.user.update({
        where: {id: userId},
        data: {avatar},
        select: publicUserSelect
    })
    return updatedUser;
}

module.exports = { getUserByUsername, updateAvatar, updateProfile}