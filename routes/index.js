// routes 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Guard}= require ('../models')
const {Admin}= require('../models')
const companyRouter= require('./company')
const loginAuth=require('../controllers/login')
const forgotPassword  = require('../controllers/forgotPassword');
const createNewPassword = require('../controllers/newPassword');
const tokenVerification = require('../controllers/tokenVerification');
const guardLogin= require('../controllers/guardLogin')
const authAdmin = require('../middleware/authAdmin')
const guardRoutes = require("./guardRoutes")
const assignmentRoutes = require("./assignmentRoutes");
const branchesRouter = require('./branches');
const inactiveRoutes = require("./inactiveRoutes")

router.use("/employees",guardRoutes)
router.use("/assignments",assignmentRoutes)
router.use("/inactivities",inactiveRoutes)

router.post("/login", loginAuth)
router.post("/login/guard", guardLogin)
//ruta para testear autorizacion 
//router.post("/auth", authAdmin)

router.use("/company", companyRouter)
router.use("/branch", branchesRouter)

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
//                       ****"I Forgot my Password"****                                            
router.post('/forgot-password', forgotPassword);  /* Send Email with recovery Token  */        
router.post('/token', tokenVerification);         /* verify if token matches         */
router.put('/new-password', createNewPassword);   /* re-write User-password          */
                                                       
module.exports = router
