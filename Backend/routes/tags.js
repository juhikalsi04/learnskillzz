const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send(console.log("tag initiated"))
})

module.exports = router