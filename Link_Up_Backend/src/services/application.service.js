const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const applyToRole = async(roleId, userId)=>{
    
    const role = await prisma.role.findUnique({
        where:{id: roleId},
    })
    if(!role){
        throw new Error("Role Not found");
    }
    if(role.creatorId === userId){
        throw new Error("Why you applying to your own role ?")
    }
    if(!role.isActive){
        throw new Error("Role is no longet Active!" )
    }
    if(new Date(role.deadline) < new Date()){
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
        if(error.code === "P2002"){
            throw new Error("You have already applied to this role")
        }
        throw error;
    }    
}

module.exports = {
    applyToRole,
};

