const {Branch} = require("../models");
const {Province} = require("../models")
class BranchServices{
    static async getAll(){
        try {
            const branches = await Branch.findAll();
            return { error: false, data: branches };
          } catch (error) {
            return { error: true, data: error };
          }
        }
    static async getOne(branchId){
        try {
                const branches = await Branch.findByPk(branchId);
                return { error: false, data: branches };
              } catch (error) {
                return { error: true, data: error };
              }
        }
    static async updateOne(body, branchId){
        try{
             await Branch.update( body,{ where: { id:branchId }});
             return { error: false};
                }
            catch(error){
            return { error: true, data: {message:'Failed to update '}}; 
                }
        }
    static async getGuards(branchId){
        try{
            const branch = await Branch.findByPk(branchId);
            const province = await Province.findByPk(branch.provinceId)
            const guards = await province.getGuards(  {attributes: ['id', 'name', 'lastName','street','location','coordinateLatitude','coordinateLength']})
            return { error: false, data: guards };

        }
        catch(error){
            return { error: true, data: {message:'No Guards '}};  
        }
    }
    
}

module.exports = BranchServices