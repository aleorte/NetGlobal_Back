const { Router } = require('express');
const express = require('express');
const companyRouter = express.Router();
const {Company}= require ('../models')
const CompanyController = require('../controllers/companyController')



//encuentra todas las companies 
companyRouter.get('/', CompanyController.getAll)
//encuentra todas las companies activas 
companyRouter.get('/active', CompanyController.getActiveOnes)
// encuentra todas las companies inactivas 
companyRouter.get('/inactive',CompanyController.getInactiveOnes)
// crea una nueva company 
companyRouter.post('/', CompanyController.addOne)
//solo  encuentra la company  y avisa si esta inactiva 
companyRouter.get('/:id', CompanyController.getOne)
//modifica una company
companyRouter.put('/:id', CompanyController.updateOne)
//encuentra las sucursal de una company
companyRouter.get('/:id/branches', CompanyController.getBranches)
//agrega una sucursal 
companyRouter.post('/:id', CompanyController.addBranch)



module.exports = companyRouter