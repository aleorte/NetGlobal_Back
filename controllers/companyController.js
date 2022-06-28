const CompanyServices = require('../services/companyServices')

class CompanyController {
      static async getAll(req, res) {
        const { error, data } = await CompanyServices.getAll();
        if (error) {
          return res.status(500).send(data);
        }
        res.status(200).send(data);
      }
      static async getOne(req, res) {
        const { error, data } = await CompanyServices.getOne(req.params.id);
        if (error) {
          return res.status(500).send(data);
        }
        return res.status(200).send(data);
      }

      static async updateOne(req,res){
        const {error,data} = await CompanyServices.updateOne(req.body,
            req.params.id)
        if (error) {
                return res.status(500).send(data);
              }
       return res.status(204).send(data);    
      }
      static async addOne(req,res){
        const {error,data} = await CompanyServices.addOne(req.body)
        if (error) {
            return res.status(500).send(data);
          }
          return res.status(201).send(data);
      }

      static async getActiveOnes (req,res){
        const { error, data } = await CompanyServices.getActiveOnes();
        if (error) {
            return res.status(500).send(data);
          }
          res.status(200).send(data);
      }
      static async getInactiveOnes (req,res){
        const { error, data } = await CompanyServices.getInactiveOnes();
        if (error) {
            return res.status(500).send(data);
          }
          res.status(200).send(data);
      }
      static async getBranches(req,res){
        const {error,data} = await CompanyServices.getBranches(req.params.id)
        if (error) {
          return res.status(500).send(data);
        }
        res.status(200).send(data);
      }
      static async addBranch(req,res){
        const {error,data} = await CompanyServices.addBranch(req.body, req.params.id)
        if (error) {
          return res.status(500).send(data);
        }
        return res.status(201).send(data);
      }
}
module.exports = CompanyController;
