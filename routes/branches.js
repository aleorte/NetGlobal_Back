const { Router } = require('express');
const express = require('express');
const   branchesRouter = express.Router();
const {Branch}= require ('../models')
const BranchController = require('../controllers/branchController')

branchesRouter.get("/", BranchController.getAll )
branchesRouter.get("/:id", BranchController.getOne )
branchesRouter.post("/:id/guards", BranchController.getGuards )
branchesRouter.get("/:id/guards", BranchController.get20kmGuards )
branchesRouter.put("/:id", BranchController.updateOne )
branchesRouter.get("/:id/tasks", BranchController.getTasks )


module.exports = branchesRouter