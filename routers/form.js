const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const User = require('../models/user');
const { error } = require('console');

const dossier_form = path.join(__dirname,'..','views','form');
router.use(express.static(dossier_form));

router.use(express.urlencoded({extended: false}));

router.get('/',(req,res)=>{
    res.render("LogIn");
})

router.post('/register',async (req,res)=>{
const user = req.body;
const {prenom,nom,email,mot_de_passe} = user;
const newUser = new User({
    prenom,
    nom,
    email,
    mot_de_passe
});
await newUser.save().then(()=>{
    res.redirect('/form/')
}).catch((error)=>{
    console.log('un erreur lors de l\' insertion: '+ error);
})
})




module.exports = router