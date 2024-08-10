const mongoose = require('mongoose');
const connection = require('../partials/connection_mongoose');

const messageSchema = new mongoose.Schema({
    roomId: {type: String,require:true},
    username: {type: String,require:true},
    message: {type: String,require:true}
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;