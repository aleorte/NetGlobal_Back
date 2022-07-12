const express = require ("express");
const {Inactive,Guard} = require('../models')
const InactiveController = require("../controllers/inactiveController");
const router = express.Router()

router.post("/guard/:id",InactiveController.addOne)
router.put("/:inactivityId",InactiveController.updateOne)
router.delete("/:inactivityId",InactiveController.deleteOne)
router.get("/",InactiveController.getAll)
router.get("/state",async (req,res)=>{
    try{
   const inactivitiesApproved = await Inactive.findAll({
             where:{state:"APPROVED"},
             include: {
               model: Guard,
             },
         });
         const inactivitiesRejected = await Inactive.findAll({
             where:{state:"REJECTED"},
             include: {
               model: Guard,
             },
         });
         res.status(200).send({approved: inactivitiesApproved , rejected: inactivitiesRejected})
    }
    catch (error) {
        res.status(500).send(error)
      }
})
router.get("/pending",async (req,res)=>{
    try {
        const inactivitiesPending = await Inactive.findAll({
          where:{state:"PENDING APPROVAL"},
          include: {
            model: Guard,
          },
          
        });
        res.status(200).send({pending:inactivitiesPending})
      } 
      
      catch (error) {
        res.status(500).send(error)
      }
})

module.exports = router;