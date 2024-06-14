const express = require('express')
const router = express.Router();
const Post = require('../models/Post');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';




router.get('/allpost', async (req, res) => {
    try {

        const posts = await Post.find().select();
        if (!posts) {
            return res.status(404).json({ error: 'No posts found' });
        }

        res.json(posts);
    } catch (error) {
        res.status(500).send('Server error');
    }

})

// to add post POST: /api/discussion/post/addpost
router.post('/addpost', fetchUser, [
    body('title', "this field is required").exists(),
    body('question', "this field is required").exists(),
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, question, tag } = req.body;
        const post = new Post({
            title,
            question,
            tag,
            user: req.user.id // Assigning the user's name to the user field
        });
        const savedPost = await post.save();


        res.json(savedPost);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occurred");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(500).send('Server error');
    }
});
module.exports = router