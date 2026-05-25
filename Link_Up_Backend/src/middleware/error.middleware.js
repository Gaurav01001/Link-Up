const { ZodError } =
  require("zod");

const errorHandler =
  (err, req, res, next) => {

    console.error(err);

    // zod validation
    if (
      err instanceof ZodError
    ) {

      return res.status(400)
        .json({

          success: false,

          message:
            "Validation failed",

          errors:
            err.issues.map(
              (e) => ({
                field:
                  e.path.join("."),
                message:
                  e.message,
              })
            ),

        });

    }

    res.status(
      err.status || 500
    ).json({

      success: false,

      message:
        err.message ||
        "Internal Server Error",

    });

};

module.exports =
  errorHandler;