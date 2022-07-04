const { Router } = require('express');
const express = require('express');
const companyRouter = express.Router();
const {Company}= require ('../models')
const CompanyController = require('../controllers/companyController')

companyRouter.get('/', CompanyController.getAll)
companyRouter.get('/active', CompanyController.getActiveOnes)
companyRouter.get('/inactive',CompanyController.getInactiveOnes)
companyRouter.post('/', CompanyController.addOne)
companyRouter.get('/:id', CompanyController.getOne)
companyRouter.put('/:id', CompanyController.updateOne)
companyRouter.get('/:id/branches', CompanyController.getBranches)
companyRouter.post('/:id', CompanyController.addBranch)

module.exports = companyRouter