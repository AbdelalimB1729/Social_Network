const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = require('./routers/form');
const task_router = require('./routers/task');
const cookieParser = require('cookie-parser');
const routerchat = require('./routers/chat')(io);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/form', router);
app.use('/chat',routerchat)
app.use('/api',task_router)

module.exports = {app , server};
