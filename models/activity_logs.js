const mongoose = require('mongoose');

const connection = require('../partials/connection_mongoose');

const activitySchema = mongoose.Schema({
    description: {type: String,required:true},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    action : {
        type: String,
        enum: ['create', 'update', 'delete'],
        required: true
    },
    task_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks',
        required: true
    }

    
    },{timestamps: true});

const model = mongoose.model('activity_logs',activitySchema);

module.exports = model;