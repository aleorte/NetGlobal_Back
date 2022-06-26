// routes 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Guard}= require ('../models')
const {Admin}= require('../models')
const companyRouter= require('./company')
const loginAuth=require('../controllers/login')
const guardLogin= require('../controllers/guardLogin')
const authAdmin = require('../middleware/authAdmin')

router.post("/login", loginAuth)
router.post("/login/guard", guardLogin)
//ruta para testear autorizacion 
//router.post("/auth", authAdmin)

router.use("/company", companyRouter)
//rutas provisorias : son para usar ahora 
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
    //crear con contrasenia en null y despues crear jwt y enviar eso 
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
