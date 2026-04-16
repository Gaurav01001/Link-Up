const prisma = require("../config/prisma")

exports.createRole = async (userId, data) => {
    const activeRole = await prisma.role.count({
        where: {
            creatorId: userId,
        }
    })
    if (activeRole >= 3) {
        throw new Error("You can only have 3 active roles");
    }

    // create new role
    const role = await prisma.role.create({
        data: {
            title: data.title,
            category: data.category,
            description: data.description,
            location: data.location,
            isOnline: data.isOnline ?? true,
            deadline: new Date(data.deadline),
            creatorId: userId,
        }
    })
    return role;
}

// function to get all the roles
exports.getRoles = async () => {
    const now = new Date();
    const roles = await prisma.role.findMany({
        where: {
            deadline: {
                gte: now,
            },
        },
        include: {
            creator: {
                select: {
                    id: true,
                    username: true,
                }
            }
        }
    });
    return roles;
}