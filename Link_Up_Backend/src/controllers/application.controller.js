const { applyToRole } = require('../services/application.service');


async function applyRole(req, res) {
  try {
    const roleId = req.params.id;
    const userId = req.user.id;

    const application = await applyToRole(roleId, userId);

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } 
    catch (error) {
    res.status(400).json({
        success: false,
        message: error.message
    });
}
}

module.exports = {
  applyRole,
};
