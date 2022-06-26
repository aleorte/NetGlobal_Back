const { Router } = require('express');
const express = require('express');
const companyRouter = express.Router();
const {Company}= require ('../models')
const findAllActiveCompanies = require('../controllers/findAllActiveCompanies')
const findAllCompanies = require('../controllers/findAllCompanies')
const createCompany = require('../controllers/createCompany')
const findCompany = require('../controllers/findCompany')
const modifyCompany = require('../controllers/modifyCompany');
const findInactiveCompanies = require('../controllers/findInactiveCompanies');

//encuentra todas las companies 
companyRouter.get('/', findAllCompanies)
//encuentra todas las companies activas 
companyRouter.get('/active', findAllActiveCompanies)
// encuentra todas las companies inactivas 
companyRouter.get('/inactive',findInactiveCompanies)
// crea una nueva company 
companyRouter.post('/', createCompany)
//solo  encuentra la company  y avisa si esta inactiva 
companyRouter.get('/:id', findCompany)
//modifica una company
companyRouter.put('/:id', modifyCompany)

module.exports = companyRouter