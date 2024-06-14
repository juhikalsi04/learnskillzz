const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send(console.log("user initiated"))
})

module.exports = router