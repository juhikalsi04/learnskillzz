const express = require('express')
const router = express.Router()
const fetchPaper = require('../middleware/fetchPaper')
const SamplePaper = require('../models/SamplePaper')
const questions = require('../models/questions');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';

router.get('/', async (req, res) => {


    const paper = await SamplePaper.find().select();
    if (!paper) {
        return res.status(404).json({ error: 'No posts found' });
    }
    const data = {
        testNo: {
            testNo: paper.testNo
        }
    }
    const paperToken = jwt.sign(data, JWT_SECRET);

    res.json(paper);

})
router.get('/:testNo', fetchPaper, async (req, res) => {
    try {
        const questionsList = await questions.find({ testNo: req.paper.testNo }).select();

        if (!questionsList || questionsList.length === 0) {
            return res.status(404).json({ error: 'No questions found for the provided testNo' });
        }

        res.json(questionsList);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { testNo, difficulty, color } = req.body; // Destructuring request body
        const samplePaper = new SamplePaper({
            testNo,
            difficulty,
            color
        });
        const savedPaper = await samplePaper.save();
        res.json(savedPaper);
    } catch (error) {
        console.error(error.message); // Log error message
        res.status(500).send('Server error');
    }
});
module.exports = router