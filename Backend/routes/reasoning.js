const express = require('express');
const router = express.Router();
const ReasoningQuestion = require('../models/reasoning'); // Import your Mongoose model for aptitude questions

router.get('/', async (req, res) => {
    try {
        // Fetch all aptitude questions from the database
        const questions = await ReasoningQuestion.find();
        res.json(questions);
    } catch (error) {
        console.error('Error fetching aptitude questions:', error);
        res.status(500).json({ error: 'Failed to fetch aptitude questions' });
    }
});
router.post('/', async (req, res) => {
    try {
        const newQuestion = new ReasoningQuestion(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error('Error adding aptitude question:', error);
        res.status(500).json({ error: 'Failed to add aptitude question' });
    }
});

module.exports = router;
