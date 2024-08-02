const express = require('express');
const app = express();
const router = require('./routers/form');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/form');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/form', router);

module.exports = app;
