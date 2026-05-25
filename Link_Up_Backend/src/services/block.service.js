const prisma =
  require("../config/prisma");

// block user
const blockUser = async (
  blockerId,
  blockedId
) => {

  // prevent self block
  if (
    blockerId === blockedId
  ) {

    throw new Error(
      "You cannot block yourself"
    );

  }

  // check blocker exists
  const blocker =
    await prisma.user.findUnique({

      where: {
        id: blockerId,
      },

    });

  if (!blocker) {

    throw new Error(
      "Blocker not found"
    );

  }

  // check blocked user exists
  const blocked =
    await prisma.user.findUnique({

      where: {
        id: blockedId,
      },

    });

  if (!blocked) {

    throw new Error(
      "User to block not found"
    );

  }

  // prevent duplicate block
  const existingBlock =
    await prisma.block.findUnique({

      where: {

        blockerId_blockedId: {
          blockerId,
          blockedId,
        },

      },

    });

  if (existingBlock) {

    throw new Error(
      "User already blocked"
    );

  }

  // create block
  const block =
    await prisma.block.create({

      data: {
        blockerId,
        blockedId,
      },

    });

  return block;
};

// unblock user
const unblockUser = async (
  blockerId,
  blockedId
) => {

  // check block exists
  const existingBlock =
    await prisma.block.findUnique({

      where: {

        blockerId_blockedId: {
          blockerId,
          blockedId,
        },

      },

    });

  if (!existingBlock) {

    throw new Error(
      "Block relationship not found"
    );

  }

  // remove block
  const unblock =
    await prisma.block.delete({

      where: {

        blockerId_blockedId: {
          blockerId,
          blockedId,
        },

      },

    });

  return unblock;
};

// get blocked users
const getBlockedUsers =
  async (blockerId) => {

    const blockedUsers =
      await prisma.block.findMany({

        where: {
          blockerId,
        },

        include: {

          blocked: {

            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },

          },

        },

      });

    return blockedUsers;

};

// get users who blocked current user
const getBlockedByUsers =
  async (blockedId) => {

    const blockedBy =
      await prisma.block.findMany({

        where: {
          blockedId,
        },

        include: {

          blocker: {

            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },

          },

        },

      });

    return blockedBy;

};

// reusable helper
const isBlocked = async (
  userA,
  userB
) => {

  const block =
    await prisma.block.findFirst({

      where: {

        OR: [

          {
            blockerId: userA,
            blockedId: userB,
          },

          {
            blockerId: userB,
            blockedId: userA,
          },

        ],

      },

    });

  return !!block;
};

module.exports = {

  blockUser,

  unblockUser,

  getBlockedUsers,

  getBlockedByUsers,

  isBlocked,

};