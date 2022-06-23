// routes 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Guard}= require ('../models')
const {Admin}= require('../models')
const loginAuth=require('../controllers/login')

router.post("/login", loginAuth)
router.post("/register/admin",async(res,req)=>{
    try{
       const newAdmin= await Admin.create(req.body);
       if (newAdmin) {res.status(200).send('A new admin was successfully created ')}
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})


