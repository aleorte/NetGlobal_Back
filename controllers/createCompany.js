 const { Company } = require( "../models")

const createCompany = async(req,res)=>{
    try{
        const newCompany = await Company.create(req.body) 
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
        res.status(400).send({message:'Failed to create '})
    }
}

module.exports= createCompany