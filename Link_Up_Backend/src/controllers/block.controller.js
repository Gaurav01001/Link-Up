const {

  blockUser,

  unblockUser,

  getBlockedUsers,

  getBlockedByUsers,

} = require(
  "../services/block.service"
);

// block user
const blockUserController =
  async (req, res) => {

    try {

      const blockerId =
        req.user.id;

      const { blockedId } =
        req.body;

      const block =
        await blockUser(
          blockerId,
          blockedId
        );

      res.status(201).json({

        success: true,

        message:
          "User blocked successfully",

        data: block,

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

// unblock user
const unblockUserController =
  async (req, res) => {

    try {

      const blockerId =
        req.user.id;

      const { blockedId } =
        req.body;

      const unblock =
        await unblockUser(
          blockerId,
          blockedId
        );

      res.status(200).json({

        success: true,

        message:
          "User unblocked successfully",

        data: unblock,

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

// get blocked users
const getBlockedUsersController =
  async (req, res) => {

    try {

      const blockerId =
        req.user.id;

      const blockedUsers =
        await getBlockedUsers(
          blockerId
        );

      res.status(200).json({

        success: true,

        data: blockedUsers,

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

// get users who blocked current user
const getBlockedByUsersController =
  async (req, res) => {

    try {

      const blockedId =
        req.user.id;

      const blockedBy =
        await getBlockedByUsers(
          blockedId
        );

      res.status(200).json({

        success: true,

        data: blockedBy,

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

  blockUserController,

  unblockUserController,

  getBlockedUsersController,

  getBlockedByUsersController,

};