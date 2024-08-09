const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const User = require('../models/user');
const conn = require('../partials/connection_mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const dossier_form = path.join(__dirname,'..','views','form');
router.use(express.static(dossier_form));

router.use(express.urlencoded({extended: false}));

router.get('/',(req,res)=>{
    res.render("LogIn");
})

router.post('/register',async (req,res)=>{
const user = req.body;
const newUser = new User(
    {
        username: user.username,
        email: user.email,
        mot_de_passe: user.mot_de_passe
        
    }
);
await newUser.save().then(()=>{
    id = newUser._id;
    const sql = 'INSERT INTO users(id,username,email,password) VALUES(?,?,?,?) ';
    conn.query(sql,[String(id),user.username,user.email,user.mot_de_passe],(error)=>{
        if(error) {
            console.log(error);
        }
        res.redirect('/form/')
    })
}).catch((error)=>{
    console.log('un erreur lors de l\' insertion: '+ error);
    res.send('erreur mongoose');
})
})

router.post('/connexion',async (req,res)=>{
    const user = req.body;
    const {email , mot_de_passe} = user;
    await User.findOne({email:email}).then(()=>{
       let verify = bcrypt.compareSync(user.mot_de_passe,User.mot_de_passe);
       if(verify){
        const sql = "SELECT * FROM users WHERE id = ?";
        conn.query(sql,[String(User._id)],(err,results)=>{
            if(err) {
                console.log(err);
            }
            else{
                if(results.length > 0){
                    const signature = crypto.randomBytes(32).toString('hex');
                    const token_access = jwt.sign({
                        id: User._id,
                        username: User.username,
                        email: User.email,
                        role: User.role
                    },signature,{expiresIn: '1h'});
                    const token_refresh = jwt.sign({
                        id: User._id,
                        username: User.username,
                        email: User.email,
                        role: User.role
                    }, signature,{expiresIn: '30d'} )
                    res.cookie(
                        'token_access',
                        token_access,
                        {httpOnly: true, secure: true, maxAge: 3600000}
                    )
                    res.cookie(
                        'token_refresh',
                        token_refresh,
                        {httpOnly: true, secure: true, maxAge: 2592000000}
                    )
                    
                }
            }
        })
       }
    })
})




module.exports = router