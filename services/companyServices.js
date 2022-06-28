const {Company} = require("../models");
const {Branch}= require ('../models');
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }
class CompanyServices {
    static async getAll(page) {
        try {
          let companies;
          let totalPages = Math.ceil(await Company.count()/30);

          if (page >= 2) {
            companies = await Company.findAll({ offset: (page - 1) * 30, limit: 30 });
          } else {
            companies = await Company.findAll({ limit: 30 });
          }
          return { error: false, data: {companies:companies,totalPages:totalPages} };
        } catch (error) {
          return { error: true, data: error };
        }
      }
      static async getOne(companyId) {
        try {
          const company = await Company.findByPk(companyId);
          const contractEnd = company.contractEndDate.split('-').join('') 
          const currentDate = formatDate(new Date()).split('-').join('')
          if (currentDate > contractEnd ) {  return { error: false, data: {message:"The contract ended", company:company} }; }
          return { error: false, data: company };
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
            const company = await Company.create(body);
            return { error: false, data: company };
        }
        catch(error){
            return { error: true, data: {message:'Failed to create '}}; 
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
            const branch = await Branch.create({
              name: body.name,
              street: body.street,
              number: body.number,
              location: body.location,
              coordinateLatitude: body.coordinateLatitude,
              coordinateLength: body.coordinateLength,
             companyId: companyId
            })
            return { error: false, data: branch };

        }
        catch(error){
            return  { error: true, data: {message:'Failed to create '}}; 
        }
    }


}

module.exports = CompanyServices;