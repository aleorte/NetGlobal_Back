const jwt=require('jsonwebtoken');
const { Admin } = require('../models');

const authAdmin = async(req,res)=>{
    let token = null
    let decodedToken={} 
    try{
      const authorization = req.get('authorization')
      if (authorization && authorization.toLowerCase().startsWith('bearer')){
         token = authorization.substring(7)
      }
      decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
      const admin = await Admin.findOne( {where:{ email : decodedToken.email}})
      if(admin.id) res.status(200).send(decodedToken) 
    }
    catch(err){
        res.status(401).send({message:'Token missing'})
    }
}

module.exports = authAdmin