const { Router } = require('express');
const express = require('express');
const adminRouter = express.Router();
const AdminController = require('../controllers/AdminController')

adminRouter.get('/', AdminController.getAll)
adminRouter.get('/:id', AdminController.getOne)
adminRouter.put('/:id', AdminController.updateOne)
adminRouter.delete('/:id', AdminController.deleteOne)

module.exports = adminRouter