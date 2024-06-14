const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const SamplePaperSchema = new Schema({
    testNo: {
        type: Number,
        required: true,
        unique: true,
    },

    difficulty: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('SamplePaper', SamplePaperSchema)