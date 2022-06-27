const express = require ("express");
const GuardController = require("../controllers/guardController");
const router = express.Router()

router.get("/",GuardController.getAll)
router.get("/:id",GuardController.getOne)
router.post("/",GuardController.addOne)
router.delete("/:id",GuardController.deleteOne)
router.put("/:id",GuardController.updateOne)
router.get("/:id/licenses",GuardController.getLicenses)
router.get("/hours/:id",GuardController.getWorkedHours)


module.exports = router;