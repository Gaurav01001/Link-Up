const { success } = require('zod');
const { message } = require('../config/prisma');
const { applyToRole, getApplicationsForRole, updateApplicationStatus: updateApplicationStatusService } = require('../services/application.service');

async function applyRole(req, res) {
  try {
    const roleId = req.params.id;
    const userId = req.user.id;

    const application = await applyToRole(roleId, userId);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}

async function updateApplication(req, res) {
  try {
    const applicationId = req.params.id;
    const userId = req.user.id;
    const { status } = req.body;

    const updated = await updateApplicationStatusService(applicationId, userId, status);

    res.status(200).json({
      success: true,
      data: updated,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function getApplications(req, res) {
  try {
    const roleId = req.params.id;
    const userId = req.user.id;

    const apps = await getApplicationsForRole(roleId, userId);

    res.status(200).json({
      success: true,
      data: apps,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  applyRole,
  getApplications,
  updateApplication,
};