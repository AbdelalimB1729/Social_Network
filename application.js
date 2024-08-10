const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = require('./routers/form');
const routerchat = require('./routers/chat')(io);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/form', router);
app.use('/chat',routerchat)

module.exports = {app , server};
