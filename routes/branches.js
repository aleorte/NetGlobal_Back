const { Router } = require('express');
const express = require('express');
const   branchesRouter = express.Router();
const {Branch}= require ('../models')
const BranchController = require('../controllers/branchController')
const authAdmin = require('../middleware/authAdmin')
branchesRouter.get("/", authAdmin, BranchController.getAll )
branchesRouter.get("/:id",authAdmin, BranchController.getOne )
branchesRouter.post("/:id/guards", BranchController.getGuards )
branchesRouter.get("/:id/guards",authAdmin, BranchController.get20kmGuards )
branchesRouter.put("/:id", authAdmin, BranchController.updateOne )
branchesRouter.get("/:id/tasks", authAdmin, BranchController.getTasks )


module.exports = branchesRouter