const express = require('express');
const app = express();
const router = require('./routers/form');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/form');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/form', router);

module.exports = app;
