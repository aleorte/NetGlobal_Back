const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Guard}= require ('../models')

const  createNewPassword = async (req, res) => {

  const { password, email, token } = req.body; // CHECK ALL FILDS ARE BEING SENT FROM FRONTEND 
  if(!password) res.status(400).send({ message: 'All fields are required' });

  const guard = await Guard.findOne({ where: { email } });  

  try { 
    guard.password = password; 
    await guard.save() // new password saved
    console.log('everything works good (:')
    res.status(200).send('new password has been set correctly')   
     
  } catch {
    return res.status(401).send({ message: 'Something went wrong' })
  }
}  

module.exports = createNewPassword;