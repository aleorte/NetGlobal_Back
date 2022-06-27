const { Router } = require('express');
const express = require('express');
const companyRouter = express.Router();
const {Company}= require ('../models')
const CompanyController = require('../controllers/companyController')
const findAllActiveCompanies = require('../controllers/findAllActiveCompanies')
const findInactiveCompanies = require('../controllers/findInactiveCompanies');


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

module.exports = companyRouter