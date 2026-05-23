const prisma = require("../config/prisma");

const createPost = async (
  authorId,
  content
) => {

  const post =
    await prisma.post.create({
      data: {
        authorId,
        content,
      },
    });

  return post;
};

const getPosts = async () => {

  const posts =
    await prisma.post.findMany({

      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

    });

  return posts;
};

const updatePost = async (
  postId,
  authorId,
  content
) => {

  // check post exists
  const existingPost =
    await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

  if (!existingPost) {
    throw new Error("Post not found");
  }

  // ownership check
  if (
    existingPost.authorId !== authorId
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  // update post
  const updatedPost =
    await prisma.post.update({
      where: {
        id: postId,
      },

      data: {
        content,
      },
    });

  return updatedPost;
};

const deletePost = async (
  postId,
  authorId
) => {

  // check post exists
  const existingPost =
    await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

  if (!existingPost) {
    throw new Error("Post not found");
  }

  // ownership check
  if (
    existingPost.authorId !== authorId
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  // delete post
  const deletedPost =
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

  return deletedPost;
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};