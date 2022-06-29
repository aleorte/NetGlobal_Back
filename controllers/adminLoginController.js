const AdminLoginServices = require("../services/adminLoginServices");

class AdminLoginController{
static async login(req,res){
    try{
        const {error,data} = await AdminLoginServices.login(req.body)
          if (data) res.send(data)
    }
    catch(error){
      res.status(500).send(data)
    }
}
}

module.exports = AdminLoginController