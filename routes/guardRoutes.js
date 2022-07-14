const express = require ("express");
const GuardController = require("../controllers/guardController");
const router = express.Router()
const authAdmin = require('../middleware/authAdmin')
router.get("/", authAdmin, GuardController.getAll)
router.get("/:id", authAdmin, GuardController.getOne)
router.get("/:id/available",GuardController.getThem)
router.get("/:id/nextTasks",GuardController.getNextTasks)
router.put("/:id",authAdmin,GuardController.updateOne)
router.get("/:id/licenses",GuardController.getLicenses)
router.get("/hours/:id",GuardController.getWorkedHours)
router.post("/login", GuardController.login)

module.exports = router;