const { Branch } = require("../models");
const { Province } = require("../models");
const { Op, Sequelize } = require("sequelize")
function getDistanceInKM (lat1, lon1, lat2, lon2) {
  if(lat1 === lat2 && lon1 === lon2) return 0;
  const radianeslat1 = (lat1/180)*Math.PI
  const radianeslat2 = (lat2/180)*Math.PI
  const radianeslon1= (lon1/180)*Math.PI
  const radianeslon2= (lon2/180)*Math.PI
  const dlat= radianeslat2 - radianeslat1
  const dlon= radianeslon2 - radianeslon1
  const rEarth= 6371.0
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(radianeslat1) * Math.cos(radianeslat2)* Math.pow(Math.sin(dlon / 2),2);       
    let distance = 2 *rEarth* Math.asin(Math.sqrt(a));
   return distance 
} 
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
