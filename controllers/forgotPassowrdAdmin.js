const {Admin}= require ('../models');
const nodemailer = require("nodemailer");


const forgotPasswordAdmin = async (req, res) => {
  const { email } = req.body; 
    if (!email) return res.status(400).send({message: 'invalid email and password!'})
  const admin = await Admin.findOne({ where: { email } });

  let token = [];         
  function tokenGenerator(){  //<== Generates the random token
    for (let i=1; i<=4; i++) {  
     token.push(Math.floor(Math.random()*10)) 
    }
    token = token.join('')
  }
   
  try {                       // Email sending right...*                                 
    tokenGenerator()
    admin.recoveryKey = token;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'javi23dsc@gmail.com', 
        pass: 'exxyryzyvodidxcz', 
      },
    });
//                                           *...Here:
    let info = await transporter.sendMail({
      from: 'Net-Global@gmail.ar', 
      to: `${ email }`, 
      subject: 'Generate New Password', 
      text: 'This is your personal token so as to create your new password',
      html: `<p> This is your personal token key which will allow yu to create a new password. Please, make sure you will not share it to anybody. </p> 
      <h1> ${ token } </h1>`
    }); 
    
    await admin.save() // token saved
    const { password, recoveryKey, ...adminInfo } = admin.dataValues  // avoid sensitive data from being sent
    return res.status(200).send(adminInfo);

  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: 'Something went wrong'})
  };
};

module.exports =  forgotPasswordAdmin;






