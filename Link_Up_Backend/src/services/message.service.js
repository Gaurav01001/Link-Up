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

const getConversations = async (userId) => {
    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { senderId: userId },
                { receiverId: userId }
            ]
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            sender: true,
            receiver: true
        }
    });
    const conversationMap = new Map();
    for (const msg of messages) {
        // Determine the other user in the conversation
        const otherUser = msg.senderId === userId ? msg.receiver : msg.sender;
        if (!otherUser) continue;
        // Keep only the newest message per unique partner
        if (!conversationMap.has(otherUser.id)) {
            conversationMap.set(otherUser.id, {
                id: otherUser.id,
                name: otherUser.name || otherUser.username,
                username: otherUser.username,
                avatar: otherUser.avatar,
                lastMessage: msg.content,
                updatedAt: msg.createdAt
            });
        }
    }
    return Array.from(conversationMap.values());
};
module.exports = {
    sendMessage,
    getConversation,
    getConversations
}