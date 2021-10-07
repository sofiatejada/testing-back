const express = require('express');
const app = express();

app.use(
  require('cors')({
    origin: true,
    credentials: true,
  })
);

app.use(express.static(`${__dirname}/../public`));
app.use(require('cookie-parser')());
app.use(express.json());

app.use('/api/v1/auth', require('./controllers/auth.js'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
