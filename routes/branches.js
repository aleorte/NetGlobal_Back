const { Router } = require('express');
const express = require('express');
const branchesRouter = express.Router();
const {Branch}= require ('../models')
const BranchController = require('../controllers/branchController')

branchesRouter.get("/", BranchController.getAll )
branchesRouter.get("/:id", BranchController.getOne )
branchesRouter.get("/:id/guards", BranchController.getGuards )
branchesRouter.put("/:id", BranchController.updateOne )








module.exports = branchesRouter