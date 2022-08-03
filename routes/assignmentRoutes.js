const express = require ("express");
const AssignmentController = require("../controllers/assignmentController");
const router = express.Router()
const authAdmin = require('../middleware/authAdmin')

router.post("/",AssignmentController.addOne)
router.put("/:id",AssignmentController.updateOne)
router.delete("/:id",AssignmentController.deleteOne)
router.get("/",AssignmentController.getAll)

module.exports = router;