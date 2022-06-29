const nodemailer = require("nodemailer");
const { Guard } = require("../models");

const guardRegister = async(req, res)=>{
    const guardInfo = req.body
    const { email } = req.body
        if (!email) return res.status(400).send({message: 'invalid email and password!'})
    
    function passwordGenerator() {   // <==  this function generates a random Password
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password= '';
        for ( let i = 1; i <= 11; i++ ) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }
    
    try {
        const password = 123  // passwordGenerator() 
        const newGuard = await Guard.create( req.body )
        newGuard.password = password

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
            subject: 'New Guard Creation', 
            text: 'New Guard has been successfully created',
            html: `
            <h1>   ¡Net Global New Guard Account! </h1>
            <p> Hi! Net Global Staff has created for you a new Guard account. A Security password has been automatically set, however you are able to modify it to what you most prefer. Regardless you can change your password in case you forget it, we extremely recommend not to delete this massage unless you have already modified your password to another one</p> 
            <h2 >Guard Email: <span style="color: #B51313; font-size: 33px;"> ${ email }</span> </h2>
            <h2> Password:  <span style="color: #B51313; font-size: 33px;"> ${ password }</span> </h2>
            <h4> SHARING THIS INFORMATION IS COMPLETELY PROHIBITED. </h4>
            <p> Cordially, Net Global. </p>
            `  
          }); 

        res.status(201).send("New Guard Account has been successfully created")

    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = guardRegister