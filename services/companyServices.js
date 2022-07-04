const { Op, Sequelize } = require("sequelize")
const {Branch,Guard,Company,Assignment,Province}= require ('../models');
const axios = require('axios')
const getDistanceInKM  = require('../functions/getDistanceInKm')
const formatDate = require('../functions/formatDate')

class CompanyServices {
    static async getAll(page) {
        try {
          let companies
          let result = [];
          let totalPages = Math.ceil(await Company.count()/30);

          if (page >= 2) {
            companies = await Company.findAll({ 
              offset: (page - 1) * 30, 
              limit: 30,
             });
             result = await Promise.all(companies.map(async(company)=>{
              const company2 = {...company.dataValues}
              company2.branches = await company.getBranches()
              return company2
            }))
          } else {
            companies = await Company.findAll({ 
              limit: 30,
            });
            result = await Promise.all(companies.map(async(company)=>{
              const company2 = {...company.dataValues}
              company2.branches = await company.getBranches()
              let guard=[]
              for (let i =0 ; i <company2.branches.length ; i++){
                const assignments = await company2.branches[i].getAssignments({attributes:["guardId","date", "state"]})
                for (let j=0 ; j < assignments.length  ; j++){
                   if (assignments[j].dataValues.state === 'PENDING' && assignments[j].dataValues.guardId) {guard.push(assignments[j].dataValues.guardId)}
               } 
               }
               let uniq = [...new Set(guard)];
               company2.guards=uniq.length
              return company2
            }))
          }
          return { error: false, data: {companies:result,totalPages:totalPages} };
        } catch (error) {
          return { error: true, data: error };
        }
      }
      static async getOne(companyId) {
        try {
          const company = await Company.findByPk(companyId);
          const contractEnd = company.contractEndDate.split('-').join('') 
          const currentDate = formatDate(new Date()).split('-').join('')
          const branches = await Branch.findAll({where:{companyId:company.id}})
          let guard=[]
           for (let i =0 ; i <branches.length ; i++){
             const assignments = await branches[i].getAssignments({attributes:["guardId","date", "state"]})
             for (let j=0 ; j < assignments.length  ; j++){
                if (assignments[j].dataValues.state === 'PENDING') {guard.push(assignments[j].dataValues.guardId)}
            } 
            }
            let uniq = [...new Set(guard)];
      
          if (currentDate > contractEnd ) {  return { error: false, data: {message:"The contract ended", company:company , branches:branches }  }; }
          return { error: false, data: {company:company , branches:branches , guards: uniq.length } };
        } catch (error) {
          return { error: true, data: error };
        }
      }
      static async updateOne(body, companyId){
        try{
            await Company.update( body,{ where: { id:companyId }});
            return { error: false};
        }
        catch(error){
            return { error: true, data: {message:'Failed to update '}}; 
        }
      }
      static async addOne(body) {
        try{
        
            let city; 
            city = body.location.split(" ").join("+")
            let geoloc = await axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=Hi8xaDQPxjO4mTdYh4yk4sfa5ewyjKcd&street=${body.number}+${body.street}&city=${city}&country=AR`)
            let coordinates = geoloc.data.results[0].locations[0].latLng
            let reverseGeoloc = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.lat}&lon=${coordinates.lng}&zoom=18&addressdetails=1`)
            let d = getDistanceInKM(Number(coordinates.lat), Number(coordinates.lng),Number(reverseGeoloc.data.lat),Number(reverseGeoloc.data.lon))
            if (d<=0,1){
            body.coordinateLatitude = Number(coordinates.lat)
            body.coordinateLength = Number(coordinates.lng)
            const company = await Company.create(body);
            return { error: false, data: company };  
            }
            return { error: true, data:"Not a valid address"};
        }
        catch(error){
            return { error: true, data: {message:'Failed to create a new company' , error: error}}; 
        }
      }
      static async getActiveOnes(){
        const currentDate = parseInt(formatDate(new Date()).split('-').join(''))
        const active = []
        try{
            const result = await Company.findAll()
            for( let i=0 ; i<result.length ; i++){
                if (parseInt(result[i].contractEndDate.split('-').join('')) >= currentDate){
                 active.push(result[i])
                }
             }
            return { error: false, data:active };
        }
        catch(error){
            console.log(error)
            return { error: true, data: {message:"Coudn't find any active companies"}};
        }
      }
      static async getInactiveOnes(){
        const currentDate = parseInt(formatDate(new Date()).split('-').join(''))
        const active = []
        try{
            const result = await Company.findAll()
            for( let i=0 ; i<result.length ; i++){
                if (parseInt(result[i].contractEndDate.split('-').join('')) < currentDate){
                 active.push(result[i])
                }
             }
            return { error: false, data:active };
        }
        catch(error){
            return { error: true, data: {message:"Coudn't find any inactive companies"}};
        }
      }
      static async getBranches(companyId){
        try{const branches = await Branch.findAll({where:{companyId:companyId}})
        return { error: false, data: branches };}
        catch(error){
          return { error: true, data: {message:"Coudn't find any braches for the company"}};
        }
      }
      static async addBranch(body,companyId){
        try{ 
          let city; 
             city = body.location.split(" ").join("+")
             let geoloc = await axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=Hi8xaDQPxjO4mTdYh4yk4sfa5ewyjKcd&street=${body.number}+${body.street}&city=${city}&country=AR`)
             let coordinates = geoloc.data.results[0].locations[0].latLng
             let reverseGeoloc = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.lat}&lon=${coordinates.lng}&zoom=18&addressdetails=1`)
             const province = await Province.findOne({where:{name: body.provinceName}})
             let d = getDistanceInKM(Number(coordinates.lat), Number(coordinates.lng),Number(reverseGeoloc.data.lat),Number(reverseGeoloc.data.lon))
             if (d<=0,1){
          const branch = await Branch.create({
              name: body.name,
              cuit: body.cuit,
              street: body.street,
              number: body.number,
              location: body.location,
              coordinateLatitude: Number(coordinates.lat),
              coordinateLength: Number(coordinates.lng),
              companyId: companyId,
              provinceId: province.id
            })
            return { error: false, data: branch }}
            return { error: true, data:"Not a valid address"};  

        }
        catch(error){
            return  { error: true, data: {message:'Failed to create a new branch ', error:error}}; 
        }
    }
    static async search(body){
      try{
        if (body.legalName){
         const result = await Company.findAll({ where: {legalName: {[Op.like]: `%${body.legalName}%`}}})
        return { error: false , data: result}}; 
        if (body.cuit){
          const  result = await Company.findAll({where:{cuit:body.cuit}})
          return { error: false , data: result}
        }
      }
      catch(error){
        return { error: true, data: {message:'Not found '}}; 
      }
    }

}

module.exports = CompanyServices;