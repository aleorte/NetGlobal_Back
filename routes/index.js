// routes 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Guard}= require ('../models')
const {Admin}= require('../models')
const loginAuth=require('../controllers/login')
const guardLogin= require('../controllers/guardLogin')
router.post("/login", loginAuth)
router.post("/login/guard", guardLogin)

router.post("/register/admin",async(req, res)=>{
    try{
       const newAdmin= await Admin.create(req.body);
       if (newAdmin) {res.status(200).send('A new admin was successfully created ')}
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
router.post("/register/guard",async(req, res)=>{
    try{
       const newGuard= await Guard.create(req.body);
       if (newGuard) {res.status(200).send('A new guard was successfully created ')}
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = router
