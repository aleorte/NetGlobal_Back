const { Branch } = require("../models");
const { Province } = require("../models");
const { Op, Sequelize } = require("sequelize")
const getDistanceInKM  = require('../functions/getDistanceInKm')
class BranchServices {
  static async getAll(page) {
    try {
      let branches;
      let totalPages = Math.ceil(await Branch.count()/30);

      if (page >= 2) {
        branches = await Branch.findAll({ offset: (page - 1) * 30, limit: 30 });
      } else {
        branches = await Branch.findAll({ limit: 30 });
      }
      return { error: false, data: {branches:branches,totalPages:totalPages} };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getOne(branchId) {
    try {
      const branches = await Branch.findByPk(branchId);
      return { error: false, data: branches };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async updateOne(body, branchId) {
    try {
      await Branch.update(body, { where: { id: branchId } });
      return { error: false };
    } catch (error) {
      return { error: true, data: { message: "Failed to update " } };
    }
  }
  static async getGuards(branchId) {
    try {
      const branch = await Branch.findByPk(branchId);
      const province = await Province.findByPk(branch.provinceId);
      const guards = await province.getGuards({
        attributes: [
          "id",
          "name",
          "lastName",
          "street",
          "location",
          "coordinateLatitude",
          "coordinateLength",
        ],
      });
      let guardsIn20Km;
      for (let i=0 ; i<guards.length ; i++){
        if(getDistanceInKM (guards[i].coordinateLatitude, guards[i].coordinateLength, branch.coordinateLatitude, branch.coordinateLength)<= 20){
          guardsIn20Km.push(guards[i])
        }
      }
      return { error: false, data: guardsIn20Km };
    } catch (error) {
      return { error: true, data: { message: "No Guards " } };
    }
  }
  static async search(body){
    try{
      if (body.name){
        const result = await Branch.findAll({ where: {name: {[Op.like]: `%${body.name}%`}}})
       return { error: false , data: result}}; 
       if (body.location){
        const result = await Branch.findAll({ where: {location: {[Op.like]: `%${body.location}%`}}})
       return { error: false , data: result}}; 
       if (body.province){
        const province = await Province.findOne({where:{name: {[Op.like]: `%${body.province}%`}}})
        const result = await province.getBranches()
       return { error: false , data: result}}; 
   }
    catch(e){
      return {error:true , data:{message:e}}
    }
  }
  static async getTasks(branchId){
    try{
      const branch = await Branch.findByPk(branchId)
      const tasks = await branch.getAssignments()
      if(tasks[0]) return { error: false , data: tasks}
     return { error: true , data: 'No tasks found'}
    }
    catch(error){
        return {error:true , data:{message:error}}
    }
  }
}

module.exports = BranchServices;
