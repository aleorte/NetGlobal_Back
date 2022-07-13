const ProvinceServices = require("../services/provinceServices");

class ProvinceController {
    static async getAll(req,res){
        const { error, data } = await ProvinceServices.getAll()
        if (error) {
            return res.status(500).send(data);
          }
          return res.status(200).send(data);
    }
}


module.exports = ProvinceController;