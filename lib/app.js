const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.static(`${__dirname}/../public`));

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', require('./controllers/auth.js'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
