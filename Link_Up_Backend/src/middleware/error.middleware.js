const { ZodError } = require('zod');

const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    // Handle Zod validation errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.issues.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }))
        });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
    });
};

module.exports = errorHandler;