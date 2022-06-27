const express = require ("express");
const InactiveController = require("../controllers/inactiveController");
const router = express.Router()

router.post("/guard/:id",InactiveController.addOne)
router.put("/:inactivityId",InactiveController.updateOne)
router.delete("/:inactivityId",InactiveController.deleteOne)
router.get("/",InactiveController.getAll)

module.exports = router;