const {Company} = require('../models')
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
const findInactiveCompanies = async (req,res)=>{
    try{
        const inactive = []
        const currentDate = parseInt(formatDate(new Date()).split('-').join(''))
        const result = await Company.findAll()
        for(i=0 ; i<result.length ; i++){
           if (parseInt(result[i].contractEndDate.split('-').join('')) < currentDate){
            inactive.push(result[i])
           }
        }
        res.status(200).send(inactive)  
    }
   catch(err){
    console.log(err)
   }
}

module.exports= findInactiveCompanies