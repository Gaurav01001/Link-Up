/* 
Receive request (req)
Extract data (body, params, user)
Call service
Send response (res)
Handles HTTP layer
Talks to client

*/

const roleService = require("../services/role.service");

const createRole = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = await roleService.createRole(userId, req.body);

        res.status(201).json({
            success: true,
            data: role,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getRoles = async (req, res) => {
    try {
        const roles = await roleService.getRoles();

        res.status(200).json({
            success: true,
            data: roles,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createRole,
    getRoles
};