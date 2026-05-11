/*
business logic
database logic
authorization logic
workflow logic
*/

/*
findUnique()
findFirst()
create() */
//step 1 import 
const prisma = require("../config/prisma");
//step 2 create function to send connection request
const sendConnectionRequest = async (requesterId, receiverId) => {
    // check if connection already exist prevent self connections
    if (requesterId === receiverId) {
        throw new Error("You connect with Yourself");
    }
    //check if reciever exist
    const receiver = await prisma.user.findUnique({
        where: {
            id: receiverId
        }
    })
    // check if user is valid
    if (!receiver) {
        throw new Error("User not found")
    }
    // step check existing connections
    const existingConnection = await prisma.connection.findFirst({
        where: {
            OR: [
                {
                    requesterId,
                    receiverId
                },
                {
                    requesterId: receiverId,
                    receiverId: requesterId
                }
            ]
        }

    })
    if (existingConnection) {
        throw new Error("Connection already exists or Pending");
    }
    const connections =
        await prisma.connection.create({
            data: {
                requesterId,
                receiverId,
            },
        });
    return connections;
}

const updateConnectionRequest = async (connectionId, userId, status) => {
    const connection = await prisma.connection.findUnique({
        where: {
            id: connectionId,
            receiverId: userId,
            status: "PENDING"
        }
    })
    if (!connection) {
        throw new Error("Connection not found");
    }

    if (connection.status !== "PENDING") {
        throw new Error("connection request already handled")
    }

    const updateConnection = await prisma.connection.update({
        where: {
            id: connectionId,
        },
        data: {
            status,
        }
    })
    return updateConnectin;
}
const getUserConnection = async (userId) => {
    const connections = await prisma.connection.findMany({
        where: {
            OR: [
                { requesterId: userId },
                { receiverId: userId }
            ],
            status: "ACCEPTED"
        },
        include: {
            requester: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    avatar: true,
                }
            },
            receiver: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    avatar: true,
                }
            }
        }
    })
    const formattedConnection = connections.map((connection) => {
        if (connection.requesterId === userId) {
            return connection.receiver;
        } else {
            return connection.requester;
        }
    })
    return formattedConnection;
}

const getPendingConnectionRequest = async (userId) => {
    const connections = await prisma.connection.findMany({
        where: {
            receiverId: userId,
            status: "PENDING"
        },
        include: {
            requester: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    avatar: true,
                }
            }
        }
    })
    const formattedRequests =
        connections.map((connection) => ({
            id: connection.id,
            status: connection.status,
            createdAt: connection.createdAt,
            requester: connection.requester,
        }));

    return formattedRequests;
    /* this is better than returning connections
    {
      "id": "...",
      "status": "PENDING",
      "createdAt": "...",
      "requester": {
        "id": "...",
        "username": "...",
        "avatar": "..."
      }
    } */
}

module.exports = {
    sendConnectionRequest,
    updateConnectionRequest,
    getUserConnection,
    getPendingConnectionRequest
}