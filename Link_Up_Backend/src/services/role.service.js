const prisma = require("../config/prisma")

exports.createRole = async (userId, data) => {
    const activeRole = await prisma.role.count({
        where: {
            creatorId: userId,
            isActive: true,
            deadline: {
                gte : new Date()
            }
        }
    })
    if (activeRole >= 3) {
        throw new Error("You can only have 3 active roles");
    }

    // create new role
    const role = await prisma.role.create({
        data: {
            title:       data.title,
            category:    data.category,
            description: data.description,
            location:    data.location,
            isOnline:    data.isOnline ?? true,
            spotsTotal:  data.spotsTotal ?? 1,
            tags:        data.tags ?? [],
            ...(data.deadline  ? { deadline:  new Date(data.deadline)  } : {}),
            ...(data.eventDate ? { eventDate: new Date(data.eventDate) } : {}),
            ...(data.imageUrl  ? { imageUrl:  data.imageUrl  }          : {}),
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
            isActive: true,
            OR: [
                { deadline: { gte: now } },
                { deadline: null },
            ],
        },
        include: {
            creator: {
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                }
            },
            _count: {
                select: { applications: true }
            }
        },
        orderBy: { createdAt: 'desc' },
    });
    return roles;
}

// get a single role by id
exports.getRoleById = async (roleId) => {
    const role = await prisma.role.findUnique({
        where: { id: roleId },
        include: {
            creator: {
                select: {
                    id: true,
                    username: true,
                    name: true,
                    avatar: true,
                    bio: true,
                }
            },
            applications: {
                where: { status: 'ACCEPTED' },
                include: {
                    applicant: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true,
                        }
                    }
                }
            },
            _count: {
                select: { applications: true }
            }
        }
    });

    if (!role) {
        throw new Error('Role not found');
    }
    return role;
}
exports.updateRole = async (roleId, userId, data) => {

    // 🔹 find role
    const role = await prisma.role.findUnique({
        where: { id: roleId }
    });

    if (!role) {
        throw new Error("Role not found");
    }

    // 🔥 RULE: only owner can update
    if (role.creatorId !== userId) {
        throw new Error("Unauthorized");
    }
        if (role.deadline && new Date(role.deadline) < new Date()) {
        throw new Error("Role expired");
    }


    // 🔹 update role
    delete data.isActive;
    const updatedRole = await prisma.role.update({
        where: { id: roleId },
        data: data
    });

    return updatedRole;
};

exports.deleteRole = async(roleId, userId)=>{
    const role =  await prisma.role.findUnique({
        where: {id : roleId}
    })

    if(!role){
        throw new Error("Role not found");
    }
    if (!role.isActive) {
    throw new Error("Cannot delete an inactive role");
}
    if(role.creatorId !== userId){
        throw new Error("Unauthorized");

    }
      if (role.deadline && new Date(role.deadline) < new Date()) {
        throw new Error("Role already expired");
    }

return await prisma.role.update({
    where: { id: roleId },
    data: { isActive: false }
});
}

exports.getMyRoles = async (creatorId) => {
    const roles = await prisma.role.findMany({
        where: { creatorId },
        include: {
            creator: {
                select: {
                    id: true,
                    username: true,
                    name: true,
                    avatar: true,
                },
            },
            _count: {
                select: { applications: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return roles;
};
