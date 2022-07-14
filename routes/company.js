const { Router } = require('express');
const express = require('express');
const companyRouter = express.Router();
const {Company}= require ('../models')
const CompanyController = require('../controllers/companyController')
const authAdmin = require('../middleware/authAdmin')
companyRouter.get('/', authAdmin, CompanyController.getAll)
companyRouter.get('/active', CompanyController.getActiveOnes)
companyRouter.get('/inactive',CompanyController.getInactiveOnes)
companyRouter.post('/', authAdmin, CompanyController.addOne)
companyRouter.get('/:id', authAdmin,CompanyController.getOne)
companyRouter.put('/:id',  authAdmin,CompanyController.updateOne)
companyRouter.get('/:id/branches', authAdmin, CompanyController.getBranches)
companyRouter.post('/:id',  authAdmin, CompanyController.addBranch)

module.exports = companyRouter