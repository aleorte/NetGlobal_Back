const {Company}= require ('../models')
const modifyCompany = async(req,res) =>{
    try{
    const [rows,result] = await Company.update(req.body,{ where: { id: req.params.id }, returning: true })
    res.status(200).send(result[0]);  
  }
    catch (err) {
      res.status(400).send({message:'Failed to update '})
      console.log(err)
    }
}

module.exports = modifyCompany