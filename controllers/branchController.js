const BranchServices = require('../services/branchServices')

class BranchController {
    static async getAll(req, res) {
        const { error, data } = await BranchServices.getAll(req.query.page);
        if (error) {
          return res.status(500).send(data);
        }
        res.status(200).send(data);
      }
      static async getOne(req, res) {
        const { error, data } = await BranchServices.getOne(req.params.id);
        if (error) {
          return res.status(500).send(data);
        }
        return res.status(200).send(data);
      }
      static async updateOne(req,res){
        const {error,data} = await BranchServices.updateOne(req.body,
            req.params.id)
        if (error) {
          if(data.code) { return res.status(400).send(data)}
          return res.status(500).send(data);
               }
       return res.status(204).send(data);    
      }
      static async  get20kmGuards(req,res){
        const {error,data} = await BranchServices.get20kmGuards(req.params.id)
        if (error) {
          return res.status(500).send(data);
        }
       return res.status(200).send(data);  
      }
      static async  getGuards(req,res){
        const {error,data} = await BranchServices.getGuards(req.params.id,req.body)
        if (error) {
          return res.status(500).send(data);
        }
       return res.status(200).send(data);  
      }
      static async search(req,res){
        const {error,data} = await BranchServices.search(req.body)
        if (data[0]) {
          return res.status(200).send(data);
        }
        return res.status(404).send({message:'Not found'});
      }
      static async getTasks(req,res){
        const {error,data} = await BranchServices.getTasks(req.params.id)
        if (error) {
          return res.status(500).send(data);
        }
       return res.status(200).send(data);  
      }
}

module.exports = BranchController