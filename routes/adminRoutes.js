const { Router } = require('express');
const express = require('express');
const adminRouter = express.Router();
const AdministratorController = require('../controllers/administratorController')

adminRouter.get('/', AdministratorController.getAll)
adminRouter.get('/:id', AdministratorController.getOne)
adminRouter.put('/:id', AdministratorController.updateOne)
adminRouter.delete('/:id', AdministratorController.deleteOne)



module.exports = adminRouter