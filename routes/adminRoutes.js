const { Router } = require('express');
const express = require('express');
const adminRouter = express.Router();
const AdminController = require('../controllers/AdminController')
const superAdminAuth = require('../middleware/superAdminAuth')
adminRouter.get('/',superAdminAuth,AdminController.getAll)
adminRouter.get('/:id', superAdminAuth, AdminController.getOne)
adminRouter.put('/:id', superAdminAuth, AdminController.updateOne)
adminRouter.delete('/:id', superAdminAuth,  AdminController.deleteOne)
adminRouter.post('/forgot-password', AdminController.forgotPassword);        
adminRouter.post('/token', AdminController.tokenVerification);         
adminRouter.put('/recover/new-password', AdminController.newPassword); 
module.exports = adminRouter