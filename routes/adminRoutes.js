const { Router } = require('express');
const express = require('express');
const adminRouter = express.Router();
const AdminController = require('../controllers/AdminController')
const authAdmin = require('../middleware/authAdmin')
adminRouter.get('/',AdminController.getAll)
adminRouter.get('/:id', authAdmin, AdminController.getOne)
adminRouter.put('/:id', authAdmin, AdminController.updateOne)
adminRouter.delete('/:id', authAdmin,  AdminController.deleteOne)
adminRouter.post('/forgot-password', AdminController.forgotPassword);        
adminRouter.post('/token', AdminController.tokenVerification);         
adminRouter.put('/recover/new-password', AdminController.newPassword); 
module.exports = adminRouter