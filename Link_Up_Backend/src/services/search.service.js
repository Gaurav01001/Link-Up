const prisma = require("../config/prisma")
const searchUsers = async (query, currentUserId) => {
    const users = await prisma.user.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { username: { contains: query, mode: "insensitive" } }
            ],
            ...(currentUserId && { NOT: { id: currentUserId } })
        },

        select: {
            id: true,
            name: true,
            username: true,
            bio: true
        }
    })
    return users;
}

module.exports = {
    searchUsers
}