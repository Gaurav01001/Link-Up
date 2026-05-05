const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const applyToRole = async (roleId, userId) => {

    const role = await prisma.role.findUnique({
        where: { id: roleId },
    })
    if (!role) {
        throw new Error("Role Not found");
    }
    if (role.creatorId === userId) {
        throw new Error("Why you applying to your own role ?")
    }
    if (!role.isActive) {
        throw new Error("Role is no longer Active!")
    }
    if (new Date(role.deadline) < new Date()) {
        throw new Error("Role deadline has passed")
    }
    try {
        const createApplication = await prisma.application.create({
            data: {
                roleId: roleId,
                applicantId: userId,
            }
        })
        return createApplication;
    } catch (error) {
        // handle duplicate application
        if (error.code === "P2002") {
            throw new Error("You have already applied to this role")
        }
        throw error;
    }
}

const getApplicationsForRole = async (roleId, userId) => {
    const role = await prisma.role.findUnique({
        where: { id: roleId },
    });

    if (!role) {
        throw new Error("Role Not Found!")
    }
    if (role.creatorId !== userId) {
        throw new Error("Unauthorized ");
    }

    const application = await prisma.application.findMany({
        where: { roleId },
        include: {
            applicant: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                }
            }
        }
    })
    return application;
}

const updateApplicationStatus = async (applocationId, userId, status) => {
    const application = await prisma.application.findUnique({
        where: {
            id: applocationId,
        },
        include: {
            role: true,
        }
    })
    if (!application) {
        throw new Error("Application not found")
    }
    if (application.role.creatorId != userId) {
        throw new Error("Unauthorized")
    }
    if (application.status !== "PENDING") {
        throw new Error("Application alrady processed");
    }
    if (!["ACCEPTED", "REJECTED"].includes(status)) {
        throw new Error("Invalid status");
    }

    const updateApplication = await prisma.application.update({
        where: {
            id: applicationId,
        },
        data: {
            status: status
        }
    })
    return updateApplication;
}

module.exports = {
    applyToRole,
    getApplicationsForRole,
    updateApplicationStatus
};

