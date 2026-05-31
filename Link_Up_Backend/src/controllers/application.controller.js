const {
  applyToRole,
  getApplicationsForRole: getApplicationsForRoleService,
  updateApplicationStatus: updateApplicationStatusService,
  getMyApplications: getMyApplicationsService,
} = require("../services/application.service");

const {
  updateApplicationSchema
} = require("../validators/application.validator");

async function applyRole(req, res) {
  try {

    const roleId = req.params.id;
    const userId = req.user.id;

    const application = await applyToRole(roleId, userId);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });

  } catch (error) {

    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });

  }
}

async function updateApplication(req, res) {
  try {

    const applicationId = req.params.id;
    const userId = req.user.id;

    // Validate request body
    const validData = updateApplicationSchema.parse(req.body);

    // Update application status
    const updated = await updateApplicationStatusService(
      applicationId,
      userId,
      validData.status
    );

    res.status(200).json({
      success: true,
      data: updated,
    });

  } catch (error) {

    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });

  }
}

async function getApplicationsForRole(req, res) {
  try {

    const roleId = req.params.id;
    const userId = req.user.id;

    const applications = await getApplicationsForRoleService(
      roleId,
      userId
    );

    res.status(200).json({
      success: true,
      data: applications,
    });

  } catch (error) {

    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });

  }
}

async function getMyApplications(req, res) {
  try {
    const userId = req.user.id;
    const applications = await getMyApplicationsService(userId);

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
}

module.exports = {
  applyRole,
  getApplicationsForRole,
  updateApplication,
  getMyApplications,
};