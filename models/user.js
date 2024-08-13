const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connection = require('../partials/connection_mongoose');
const { Schema } = mongoose;
const user = Schema({
    username : {type: String,maxlength: 50,require:true, unique: true},
    email: {type: String,maxlength: 100,require:true,unique:true},
    mot_de_passe: {type: String,maxlength: 100,require:true},
    role: {
        type: String,
        maxlength: 50,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
      }},{timestamps: true} );
user.pre('save',async function(next){
    try{
        const sel = await bcrypt.genSalt(10);
        const pass_hash = await bcrypt.hash(this.mot_de_passe,sel);
        this.mot_de_passe = pass_hash;
        next();
    }catch(error){
        console.log('erreur lors du hashage: '+error);
    }
});

module.exports = mongoose.model('User', user);