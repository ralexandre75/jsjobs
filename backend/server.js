const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const api = express.Router();

api.get('/jobs', (req, res) => {
    res.json({ success: true, message: 'Hello word'});
});

app.use('/api', api);

const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});