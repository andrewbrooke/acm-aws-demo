require('dotenv').config();

const debug = require('debug')(process.env.DEBUG + ':app');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// Init modules
require('./s3').default();
require('./pg').default();

const v1 = new express.Router();
const v1Response = (req, res) => {
    res.json({ message: 'API version: 1' });
};

v1.get('', v1Response);
v1.get('/version', v1Response);

const routes = require('./routes');
v1.post('/upload', ...routes.uploadS3);

const apiBase = '/api';
app.use(`${apiBase}`, v1);
app.use(`${apiBase}/v1`, v1);

debug(`App starting up on ${port}`);
app.listen(port, () => {
    debug(`App listening on ${port}`);
});

module.exports = app;
