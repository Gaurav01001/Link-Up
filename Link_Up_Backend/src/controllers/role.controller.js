/* 
Receive request (req)
Extract data (body, params, user)
Call service
Send response (res)
Handles HTTP layer
Talks to client

*/

const roleService = require("../services/role.service");
const { createRoleSchema } = require("../validators/role.validators");

const createRole = async (req, res) => {
    try {
        const validData = createRoleSchema.parse(req.body);
        const userId = req.user.id;
        const role = await roleService.createRole(userId, validData);

        res.status(201).json({
            success: true,
            data: role,
        });
    } catch (error) {
        // Zod validation error
        if (error?.issues) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.issues.map(e => ({
                    field: e.path.join('.'),
                    message: e.message
                }))
            });
        }
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
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