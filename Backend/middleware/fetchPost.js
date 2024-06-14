const Post = require('../models/Post'); // Adjust the path to your Post model

const fetchPost = async (req, res, next) => {
    const postId = req.params.postId;
    if (!postId) {
        return res.status(400).send({ error: 'Post ID is required' });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        req.post = post;
        next();
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = fetchPost;
