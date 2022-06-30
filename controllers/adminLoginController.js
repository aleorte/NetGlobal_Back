const AdminLoginServices = require("../services/adminLoginServices");

class AdminLoginController{
static async login(req,res){
    try{
        const {error,data} = await AdminLoginServices.login(req.body)
          if (error) res.status(data.code).send(data)
          res.status(200).send(data)
    }
    catch(error){
      res.status(500).send(data)
    }
}
}

module.exports = AdminLoginController