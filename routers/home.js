const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const User = require('../models/user');
const conn = require('../partials/connection_mysql');

const dossier_form = path.join(__dirname,'..','views');
router.use(express.static(dossier_form));

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.get('/',(req,res)=>{
    res.render('home');
})

module.exports = router;