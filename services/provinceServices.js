const { Province } = require('../models')

class ProvinceServices{
    static async getAll(){
 try{
    const provinces = await Province.findAll()
    if(provinces) return { error: false, data: provinces }
 }
 catch(error){
    return { error: true, data: error };
 }

    }
}

module.exports = ProvinceServices