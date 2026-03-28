const {
  getUserByUsername,
  updateProfile,
  updateAvatar
} = require('../services/user.service');

const {
  updateProfileSchema,
  updateAvatarSchema
} = require('../validators/user.validator');


// 📌 Get Profile
async function getProfile(req, res) {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);

    res.status(200).json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Internal server error'
    });
  }
}


// 📌 Edit Profile
async function editProfile(req, res) {
  try {
    const validData = updateProfileSchema.parse(req.body);

    // ❌ Fix: Object.keys?(validData) → wrong
    if (Object.keys(validData).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const updatedUser = await updateProfile(req.user.id, validData);

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    // ❌ Simplified validation error handling
    if (error.errors) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map(e => ({
          field: e.path.join('.'), // ❌ fixed from json('.')
          message: e.message
        }))
      });
    }

    console.error('Edit profile error:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Internal server error'
    });
  }
}


// 📌 Change Avatar
async function changeAvatar(req, res) {
  try {
    const validData = updateAvatarSchema.parse(req.body);

    const updatedUser = await updateAvatar(
      req.user.id,
      validData.avatar
    );

    res.status(200).json({
      message: 'Avatar updated successfully',
      user: updatedUser
    });

  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }

    console.error('Change avatar error:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Internal server error'
    });
  }
}


module.exports = {
  getProfile,
  editProfile,
  changeAvatar
};