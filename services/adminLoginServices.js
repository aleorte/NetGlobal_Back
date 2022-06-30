const {Admin} = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class AdminLoginServices{
 static async login(body){
    try{
        const admin = await Admin.findOne({ where: { email: body.email } })
        if (! admin) return {error: true, data:{code:404,message:"La cuenta no se encuentra registada"} }
        const isAdminValid= await bcrypt.compare(body.password, admin.password)
        if (!isAdminValid) return {error: true, data:{code:401,message:"Contraseña incorrecta"}}
       
       const adminForToken = {
           id: admin.id,
           email: admin.email,
           superAdmin:admin.superAdmin
         }
        const token = jwt.sign(adminForToken, process.env.TOKEN_SECRET,{expiresIn: "24h"});
        return {error: false, data:{id:admin.id , name:admin.name, lastName:admin.lastName ,  email:admin.email, image:admin.image, token ,superAdmin: admin.superAdmin}} 

    }
    catch(error){
        return { error: true, data: {code:500 , message: 'Failed to login '} };
    }
 }
}

module.exports = AdminLoginServices