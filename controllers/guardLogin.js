const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Guard}= require ('../models')

const guardLogin = async(req,res)=>{
try{
    const guard= await Guard.findOne({ where: { email: req.body.email } })
    if (!guard) {res.status(401).send({message: 'invalid email and password!'}) }
    const isValid= await bcrypt.compare(req.body.password, guard.password)
    if (!isValid) return res.status(401).send({message: 'invalid email and password!'})
          const guardToken = {
             id: guard.id,
             email: guard.email,
           } 
                   //sign toma un usuario y una clave y devuelve un token de autenticacion 
        const token = jwt.sign(guardToken, process.env.TOKEN_SECRET,{expiresIn: "10m"});
          let {password,...employee} = guard.dataValues 
          res.status(200).send({...employee, token}) 
         
      
}
catch(err){
    console.log(err)
}
}

module.exports = guardLogin