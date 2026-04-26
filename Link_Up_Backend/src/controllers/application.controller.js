const { applyToRole } = require('../services/application.service');

// 📌 Apply to a Role
async function applyRole(req, res) {
  try {
    const { roleId } = req.params;
    const userId = req.user.id;

    const application = await applyToRole(roleId, userId);

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    console.error('Apply to role error:', error);

    // Known business-logic errors thrown by the service
    const knownErrors = [
      'Role Not found',
      'Why you applying to your own role ?',
      'Role is no longet Active!',
      'Role deadline has passed',
      'You have already applied to this role',
    ];

    if (knownErrors.includes(error.message)) {
      return res.status(400).json({ error: error.message });
    }

    res.status(error.status || 500).json({
      error: error.message || 'Internal server error',
    });
  }
}

module.exports = {
  applyRole,
};
