const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require(
  "../services/post.service"
);


const createPostController = async(req, res)=>{
    try{
        const {content} = req.body;
        const authorId = req.user.id;
        const post = await createPost(authorId, content);
        res.status(201).json({message: "Post created successfully", post});
    }catch(error){
        console.error(error);
        res.status(400).json({message: "Failed to create post"});
    }
}

const getPostsController = async(req, res)=>{
    try{
        const posts = await getPosts();
        res.status(200).json({message: "Posts fetched successfully", posts});
    }catch(error){
        console.error(error);
        res.status(400).json({message: "Failed to fetch posts"});
    }
}

const updatePostController = async(req, res)=>{
    try{
        const {content} = req.body;
        const authorId = req.user.id;
        const postId = req.params.id;
        const post = await updatePost(postId, authorId, content);
        res.status(200).json({message: "Post updated successfully", post});
    }catch(error){
        console.error(error);
        res.status(400).json({message: "Failed to update post"});
    }
}

const deletePostController = async(req, res)=>{
    try{
        const authorId = req.user.id;
        const postId = req.params.id;
        const post = await deletePost(postId, authorId);
        res.status(200).json({message: "Post deleted successfully", post});
    }catch(error){
        console.error(error);
        res.status(400).json({message: "Failed to delete post"});
    }
}

module.exports = {
    createPostController,
    getPostsController,
    updatePostController,
    deletePostController
}