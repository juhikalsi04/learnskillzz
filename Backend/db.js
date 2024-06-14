const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://juhikalsi:juhikalsi@cluster0.xajhsqh.mongodb.net/'

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    console.log("connected to mongo successfully")
}

module.exports = connectToMongo;