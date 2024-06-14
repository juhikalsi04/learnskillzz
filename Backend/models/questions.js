const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const questionSchema = new Schema({
    paperNo: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('question', questionSchema)