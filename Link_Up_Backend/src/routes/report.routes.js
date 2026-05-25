const express =
  require("express");

const router =
  express.Router();

const authentication = require(
  "../middleware/auth.middleware"
);

const {

  createReportController,

  getReportsController,

  getReportByIdController,

  deleteReportController,

} = require(
  "../controllers/report.controller"
);

// create report
router.post(
  "/",
  authentication,
  createReportController
);

// get all reports
router.get(
  "/",
  authentication,
  getReportsController
);

// get single report
router.get(
  "/:id",
  authentication,
  getReportByIdController
);

// delete report
router.delete(
  "/:id",
  authentication,
  deleteReportController
);

module.exports = router;