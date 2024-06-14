const SamplePaper = require('../models/SamplePaper');

const fetchPaper = async (req, res, next) => {
    try {
        const paper = await SamplePaper.findOne({ testNo: req.params.testNo });

        if (!paper) {
            res.status(404).json({ error: 'Sample paper not found' });
            return; // Exit the middleware
        }

        req.paper = paper; // Set the fetched paper to req.paper
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

module.exports = fetchPaper;
