const {

  createReport,

  getReports,

  getReportById,

  deleteReport,

} = require(
  "../services/report.service"
);

// create report
const createReportController =
  async (req, res) => {

    try {

      const reporterId =
        req.user.id;

      const {
        reportedId,
        reason,
        description,
      } = req.body;

      const report =
        await createReport(

          reporterId,
          reportedId,
          reason,
          description

        );

      res.status(201).json({

        success: true,

        message:
          "Report created successfully",

        data: report,

      });

    } catch (error) {

      console.error(error);

      res.status(400).json({

        success: false,

        message:
          error.message,

      });

    }

};

// get all reports
const getReportsController =
  async (req, res) => {

    try {

      const reports =
        await getReports(req.user.id);

      res.status(200).json({

        success: true,

        data: reports,

      });

    } catch (error) {

      console.error(error);

      res.status(400).json({

        success: false,

        message:
          error.message,

      });

    }

};

// get report by id
const getReportByIdController =
  async (req, res) => {

    try {

      const reportId =
        req.params.id;

      const report =
        await getReportById(
          reportId , req.user.id
        );

      res.status(200).json({

        success: true,

        data: report,

      });

    } catch (error) {

      console.error(error);

      res.status(400).json({

        success: false,

        message:
          error.message,

      });

    }

};

// delete report
const deleteReportController =
  async (req, res) => {

    try {

      const reportId =
        req.params.id;

      const report =
        await deleteReport(
          reportId , req.user.id
        );

      res.status(200).json({

        success: true,

        message:
          "Report deleted successfully",

        data: report,

      });

    } catch (error) {

      console.error(error);

      res.status(400).json({

        success: false,

        message:
          error.message,

      });

    }

};

module.exports = {

  createReportController,

  getReportsController,

  getReportByIdController,

  deleteReportController,

};