const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs')

app.use(bodyParser.json());

const api = express.Router();

api.get('/jobs', (req, res) => {
    // res.json({ success: true, message: 'hello world'});
    res.json(data.jobs);
});

app.use('/api', api);

const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});