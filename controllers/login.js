const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Guard}= require ('../models')
const {Admin}= require('../models')
 const loginAuth = async( req, res  )=>{
    try{
     const admin = await Admin.findOne({ where: { email: req.body.email } })
     if (! admin) {res.status(404).send({code:404,message:"La cuenta no se encuentra registada"}) }
     const isAdminValid= await bcrypt.compare(req.body.password, admin.password)
     if (!isAdminValid) return res.status(401).send( {code:401,message:"Contraseña incorrecta"})
    
    const adminForToken = {
        id: admin.id,
        email: admin.email,
      }
              //sign toma un usuario y una clave y devuelve un token de autenticacion 
     const token = jwt.sign(adminForToken, process.env.TOKEN_SECRET,{expiresIn: "24h"});
     res.status(200).send({id:admin.id , email:admin.email, token ,superAdmin: admin.superAdmin }) 
    } 
    catch(err){
     console.log(err)
    }
}

module.exports = loginAuth