const express = require ("express");
const {Inactive,Guard} = require('../models')
const InactiveController = require("../controllers/inactiveController");
const router = express.Router()
const authAdmin = require('../middleware/authAdmin')
router.post("/guard/:id",InactiveController.addOne)
router.put("/:inactivityId",InactiveController.updateOne)
router.delete("/:inactivityId",InactiveController.deleteOne)
router.get("/",InactiveController.getAll)
router.get("/state",InactiveController.getRejectedAndApproved)
router.get("/pending",InactiveController.getPending)

module.exports = router;