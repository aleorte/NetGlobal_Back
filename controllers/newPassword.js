const {Guard}= require ('../models')

const  createNewPassword = async (req, res) => {

  const { password, email } = req.body; 
    if(!password) res.status(400).send({ message: 'All fields are required' });
  const guard = await Guard.findOne({ where: { email } });  

  try { 
    guard.password = password; 
    await guard.save()    // new password saved
    res.status(200).send('new password has been set correctly')   
     
  } catch {
    return res.status(401).send({ message: 'Something went wrong' })
  }
}  

module.exports = createNewPassword;