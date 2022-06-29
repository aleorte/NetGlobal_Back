const {Admin}= require ('../models')

const  createNewPasswordAdmin = async (req, res) => {

  const { password, email } = req.body; 
    if(!password) res.status(400).send({ message: 'All fields are required' });
  const admin = await Admin.findOne({ where: { email  } }) 

  try { 
    admin.password = password; 
    await admin.save()    // new password saved
    res.status(200).send('new password has been set correctly') 

  } catch {
    return res.status(401).send({ message: 'Something went wrong' })
  }
}  

module.exports = createNewPasswordAdmin;