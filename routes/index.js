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
const forgotPasswordAdmin = require('../controllers/forgotPassowrdAdmin');
const tokenVerificationAdmin = require('../controllers/tokenVerificationAdmin');
const createNewPasswordAdmin = require('../controllers/newPasswordAdmin');
const GuardController = require("../controllers/guardController");
const AdminLoginController = require ('../controllers/adminLoginController');
const CompanyController = require('../controllers/companyController')
const adminRegister = require('../controllers/adminRegister');
const guardRegister = require('../controllers/guardRegister');

router.use("/employees",guardRoutes)
router.use("/assignments",assignmentRoutes)
router.use("/inactivities",inactiveRoutes)
router.post("/login", AdminLoginController.login)
//ruta para testear autorizacion 
router.post("/auth", authAdmin)
router.post("/search/company", CompanyController.search)
router.use("/company", companyRouter)
router.use("/branch", branchesRouter)
//register routes
router.post("/register/admin", adminRegister)
router.post("/register/guard", guardRegister)
//routes of "I Forgot my Password" for Guards                                            
router.post('/forgot-password', forgotPassword);  //1° Send Email with recovery Token         
router.post('/token', tokenVerification);         //2° verify if token matches        
router.put('/new-password', createNewPassword);   //3° re-write User-password        
//routes of "I Forgot my Password" for Admins                                     
router.post('/admin/forgot-password', forgotPasswordAdmin);        
router.post('/admin/token', tokenVerificationAdmin);         
router.put('/admin/new-password', createNewPasswordAdmin); 

module.exports = router
 