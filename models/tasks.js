const mongoose = require('mongoose');
const connection = require('../partials/connection_mongoose');
const user = require('../models/user');

const taskSchema = mongoose.Schema({
    title: {type: String,required:true},
    description: {type: String,required:true},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    created_at : {
        type: Date,
        default: Date.now
    },
    updated_at : {
        type: Date,
        default: Date.now
        }
    
    });

const model = mongoose.model('Task',taskSchema);
module.exports = model;