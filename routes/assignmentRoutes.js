const express = require ("express");
const AssignmentController = require("../controllers/assignmentController");
const router = express.Router()

router.post("/",AssignmentController.addOne)
router.put("/:id",AssignmentController.updateOne)


module.exports = router;