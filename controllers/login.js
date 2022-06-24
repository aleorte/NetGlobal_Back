const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Guard}= require ('../models')
const {Admin}= require('../models')
 const loginAuth = async( req, res  )=>{
    try{
     const admin = await Admin.findOne({ where: { email: req.body.email } })
     if (! admin) {res.status(401).send({message: 'invalid email and password!'}) }
     const isAdminValid= await bcrypt.compare(req.body.password, admin.password)
     if (!isAdminValid) return res.status(401).send( {message: 'invalid email and password!'})
    
    const adminForToken = {
        id: admin.id,
        email: admin.email,
      }
              //sign toma un usuario y una clave y devuelve un token de autenticacion 
     const token = jwt.sign(adminForToken, '602b58ba85c1b52b7f86e58783fcb359c46daea3bbc0143744816f890a7042bc4f3049d646ed8e4254b6ba1c861367e137f1cd9eb29884680a2daf2620a5720b');
     res.status(200).send({id:admin.id , email:admin.email, token}) 
    } 
    catch(err){
     console.log(err)
    }
}

module.exports = loginAuth