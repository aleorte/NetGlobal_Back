const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Guard}= require ('../models')
const {Admin}= require('../models')
const companyRouter= require('./company')
const forgotPassword  = require('../controllers/forgotPassword');
const createNewPassword = require('../controllers/newPassword');
const tokenVerification = require('../controllers/tokenVerification');
const authAdmin = require('../middleware/authAdmin')
const guardRoutes = require("./guardRoutes")
const assignmentRoutes = require("./assignmentRoutes");
const branchesRouter = require('./branches');
const inactiveRoutes = require("./inactiveRoutes")
const GuardController = require("../controllers/guardController");
const AdminLoginController = require ('../controllers/adminLoginController')

router.use("/employees",guardRoutes)
router.use("/assignments",assignmentRoutes)
router.use("/inactivities",inactiveRoutes)
router.post("/login", AdminLoginController.login)
//ruta para testear autorizacion 
router.post("/auth", authAdmin)
router.use("/company", companyRouter)
router.use("/branch", branchesRouter)
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
//                       ****"I Forgot my Password"****                                            
router.post('/forgot-password', forgotPassword);  /* Send Email with recovery Token  */        
router.post('/token', tokenVerification);         /* verify if token matches         */
router.put('/new-password', createNewPassword);   /* re-write User-password          */
                                                       
module.exports = router
