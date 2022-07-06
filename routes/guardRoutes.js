const express = require ("express");
const GuardController = require("../controllers/guardController");
const router = express.Router()

router.get("/",GuardController.getAll)
router.get("/:id",GuardController.getOne)
router.put("/:id",GuardController.updateOne)
router.get("/:id/licenses",GuardController.getLicenses)
router.get("/hours/:id",GuardController.getWorkedHours)
router.post("/login", GuardController.login)

module.exports = router;