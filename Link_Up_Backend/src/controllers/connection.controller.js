/* controller is Bridge Layer
HTTP request
↓
service logic
↓
HTTP response

basically 
Client/Postman/Frontend
        ↓
Routes
        ↓
Controller
        ↓
Service
        ↓
Prisma/Database

controller should 
- receive the data
- talk to service
- send the response
POST /connections/request
{
  "receiverId": "123"
}
controller handles 
req
res
params
body
auth user
status codes
sending JSON */

//import services

const { sendConnectionRequest,
    updateConnectionRequest,
    getUserConnections,
    getPendingConnectionRequest
} = require("../services/connection.service")

// create controller for POST /connections/request

const sendRequest = async (req, res) => {
    // extract logged-in userid
    try {
        const requesterId = req.user.id;
        const { receiverId } = req.body;

        //call service
        const connection = await sendConnectionRequest(requesterId, receiverId);
        res.status(201).json({
            success: true,
            message: "Connection request sent successfully",
            data: connection,
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }


}
const updateRequest = async (req, res) => {
    //extract connectionid
    try {
        const userId = req.user.id;
        const connectionId = req.params.id;
        const { status } = req.body;
        //call service
        const connection = await updateConnectionRequest(connectionId, userId, status);
        res.status(200).json({
            success: true,
            message: "Connection request updated successfully",
            data: connection,
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
const getConnections = async (req, res) => {
    try {
        const userId = req.user.id;
        const connections = await getUserConnections(userId);
        res.status(200).json({
            success: true,
            message: "Connections fetched successfully",
            data: connections,
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
const getPendingRequest = async (req, res) => {
    try {
        const userId = req.user.id;
        const pendingReq = await getPendingConnectionRequest(userId);
        res.status(200).json({
            success: true,
            message: "Pending connection requests fetched successfully",
            data: pendingReq,
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
module.exports = {
    sendRequest,
    updateRequest,
    getConnections,
    getPendingRequest
}