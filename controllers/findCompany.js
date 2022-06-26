
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

const findCompany = async (req,res)=>{
    try{
        const result = await Company.findByPk(req.params.id)
        const contractEnd = result.contractEndDate.split('-').join('') 
        const currentDate = formatDate(new Date()).split('-').join('')
        if (currentDate > contractEnd ) {res.status(200).send({ message: 'This contract has ended ' , info: result})}
        res.status(200).send(result)  
    }
   catch(err){
    console.log(err)
    res.sendStatus(400)
   }
}

module.exports= findCompany