const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // zod validation
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  const status = err.status || 500;
  const isClientError = status >= 400 && status < 500;

  res.status(status).json({
    success: false,
    message: isClientError ? (err.message || "Bad Request") : "Something went wrong try again later.",
  });
};

module.exports = errorHandler;