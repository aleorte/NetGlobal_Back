
const {Company} = require('../models')
const findAllCompanies = async (req,res)=>{
    try{
        const result = await Company.findAll()
        if(result[0]) {res.status(200).send(result)}  
    }
   catch(err){
    console.log(err)
   }
}

module.exports= findAllCompanies