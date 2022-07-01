const AdminLoginServices = require("../services/adminServices");

class AdminLoginController{
static async login(req,res){
        const {error,data} = await AdminLoginServices.login(req.body)
          if (error) {
            if(data.code === 404) return res.status(404).send(data)
             return res.status(401).send(data)
          }
         return  res.status(200).send(data)
}
}

module.exports = AdminLoginController

