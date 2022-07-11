const { Branch } = require("../models");
const { Province } = require("../models");
const { Guard } = require("../models");
const { Op, Sequelize } = require("sequelize");
const axios = require('axios');
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
      if(body.street && body.number && body.location){
        let city; 
        city = body.location.split(" ").join("+")
        let geoloc = await axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=Hi8xaDQPxjO4mTdYh4yk4sfa5ewyjKcd&street=${body.number}+${body.street}&city=${city}&country=AR`)
        let coordinates = geoloc.data.results[0].locations[0].latLng
        let reverseGeoloc = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.lat}&lon=${coordinates.lng}&zoom=18&addressdetails=1`)
        let street = geoloc.data.results[0].locations[0].street
        let d = getDistanceInKM(Number(coordinates.lat), Number(coordinates.lng),Number(reverseGeoloc.data.lat),Number(reverseGeoloc.data.lon))
        if (!(d<=0,1 && (street.length >= 2))){ return { error: true, data:{code:400, message:"Not a valid address"}};}
        body.coordinateLatitude = Number(coordinates.lat)
        body.coordinateLength = Number(coordinates.lng)
      }
      await Branch.update(body, { where: { id: branchId } });
      return { error: false };
    } catch (error) {
      return { error: true, data: { message: "Failed to update " } };
    }
  }
  static async getGuards(branchId,body) {
    try {
      let guardsIn20Km= []
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
      let ids = []
      for (let i=0 ; i<guards.length ; i++){
       const assignments = await guards[i].getAssignments(); 
       for (let i=0; i<assignments.length; i++ ){
        if (assignments[i].date === body.date){
           ids.push(assignments[i].guardId)
        }
       }
        if(getDistanceInKM (guards[i].coordinateLatitude, guards[i].dataValues.coordinateLength, branch.coordinateLatitude, branch.coordinateLength)<= 20 && !(ids.includes(guards[i].id))){
          guardsIn20Km.push(guards[i])
        }
      }
      if(guardsIn20Km.length === 0 ) {return {error: true, data: { message: "No Guards " }  }}
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
      let assignments=[]
      const branch = await Branch.findByPk(branchId)
      const tasks = await branch.getAssignments()
      for(let i=0; i<tasks.length ; i++){
          const guard = await Guard.findByPk(tasks[i]["guardId"])
          let guardName = guard.dataValues.name + " " + guard.dataValues.lastName 
          let task2={...tasks[i].dataValues}
          task2.guardName=guardName
          assignments.push(task2)
      }
      if(tasks[0]) return { error: false , data: assignments}
     return { error: true , data: 'No tasks found'}
    }
    catch(error){
        return {error:true , data:{message:error}}
    }
  }
}

module.exports = BranchServices;
