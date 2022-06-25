const { Router } = require('express');
const express = require('express');
const companyRouter = express.Router();
const {Company}= require ('../models')

companyRouter.get('/', async (req,res)=>{
    try{
        const result = await Company.findAll()
        res.status(200).send(result)  
    }
   catch(err){
    console.log(err)
   }
})
companyRouter.post('/', async(req,res)=>{
    try{
        const newCompany = await Company.create(req.body) 
    }
    catch(err){
        console.log(err)
        res.status(400).send({message:'Failed to create '})
    }
})

module.exports = companyRouter