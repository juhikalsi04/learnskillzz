const express = require('express');
const router = express.Router();
const VerbalQuestion = require('../models/verbal'); // Import your Mongoose model for aptitude questions

router.get('/', async (req, res) => {
    try {
        // Fetch all aptitude questions from the database
        const questions = await VerbalQuestion.find();
        res.json(questions);
    } catch (error) {
        console.error('Error fetching aptitude questions:', error);
        res.status(500).json({ error: 'Failed to fetch aptitude questions' });
    }
});
router.post('/', async (req, res) => {
    try {
        const newQuestion = new VerbalQuestion(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error('Error adding aptitude question:', error);
        res.status(500).json({ error: 'Failed to add aptitude question' });
    }
});

module.exports = router;
