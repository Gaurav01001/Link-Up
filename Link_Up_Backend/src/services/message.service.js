const prisma = require("../config/prisma")
const sendMessage = async (senderId, receiverId, content) => {
    if (senderId === receiverId) throw new Error("Cant send Message to yourself!")

    const receiver = await prisma.user.findUnique({
        where: {
            id: receiverId
        }
    })
    if (!receiver) throw new Error("Receiver not found!")

    const message = await prisma.message.create({
        data: {
            senderId,
            receiverId,
            content
        }
    })
    return message;
}

const getConversation = async (userId, targetUserId) => {

    const targetUser = await prisma.user.findUnique({
        where: {
            id: targetUserId
        }
    })
    if (!targetUser) throw new Error("Target user not found!")

    const messages =
        await prisma.message.findMany({
            where: {
                OR: [

                    {
                        senderId: userId,
                        receiverId: targetUserId,
                    },

                    {
                        senderId: targetUserId,
                        receiverId: userId,
                    },

                ],
            },

            orderBy: {
                createdAt: "asc", //oldest first
            }
        });
    return messages;
}

const getConversations = async(userId) =>{
    const conversation = await prisma.message.findMany({
        where:{
           OR:[
            {senderId:userId},
            {receiverId:userId}
        ]
        },
        include:{
            sender:true,
            receiver:true
        }
    })
    return conversation;
}
module.exports = {
    sendMessage,
    getConversation,
    getConversations
}