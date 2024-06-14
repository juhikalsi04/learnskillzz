const express = require("express");
const app = express();
const port = 5000;
const connectToMongo = require('./db');
const fetchUser = require("./middleware/fetchUser");
connectToMongo();
const cors = require('cors');


// Enable CORS for all routes
app.use(cors());
app.use(express.json())

app.use('/api/discussion/post', require('./routes/post'))
app.use('/api/discussion/post/user', require('./routes/user'))
app.use('/api/discussion/auth', require('./routes/auth'))
app.use('/api/discussion/reply', require('./routes/replies'))
app.use('/api/discussion/tag', require('./routes/tags'))
app.use('/api/onlinetest/sampletest', require('./routes/samplepaper'))
app.use('/api/aptitude', require('./routes/aptitude'))
app.use('/api/reasoning', require('./routes/reasoning'))
app.use('/api/verbal', require('./routes/verbal'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
