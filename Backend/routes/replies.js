const express = require("express");
const { body, validationResult } = require('express-validator');
const { Reply, validateReply } = require("../models/replies");
const _ = require("lodash");
const Post = require("../models/Post");
const fetchPost = require("../middleware/fetchPost");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

router.post(
    '/:postId',
    fetchUser,
    fetchPost,
    [
        body('comment', 'Comment is required').not().isEmpty(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { comment } = req.body;
            const reply = new Reply({
                comment,
                author: req.user.id,
                post: req.post.id,
            });

            const saveReply = await reply.save();
            res.send(saveReply);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occurred");
        }
    }
);

// Get all replies for a particular post
router.get('/:postId', async (req, res) => {
    try {
        // Find all replies associated with the given post ID
        const replies = await Reply.find({ post: req.params.postId })
            .populate('author', 'name')  // Populate author's name from User model
            .populate('post', 'title');  // Populate post's title from Post model

        if (!replies) {
            return res.status(404).json({ msg: 'No replies found for this post' });
        }

        res.json(replies);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

