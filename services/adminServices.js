const { Admin } = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

class AdminServices{

    static async login( body ){
        const { email, password } = body

        try{
            const admin = await Admin.findOne({ where: { email } })
             if (!admin) return { error: true, data: { code:404, message: "Email not found" }}
            const isAdminValid = await bcrypt.compare(password, admin.password)
             if (!isAdminValid) return { error: true,  data: {code:401, message:" Unauthorized ,incorrect password" }}
        
            const adminForToken = {
                id: admin.id,
                email: admin.email,
                superAdmin:admin.superAdmin
            }
            const token = jwt.sign(adminForToken, process.env.TOKEN_SECRET,{expiresIn: "24h"});
            return {error: false, data:{ id:admin.id , cuil:admin.cuil, email:admin.email ,superAdmin: admin.superAdmin, name: admin.name, lastName: admin.lastName, image: admin.image, recoveryKey: admin.recoveryKey, number:admin.number,street:admin.street, location:admin.location, coordinateLatitude: admin.coordinateLatitude, coordinateLength:admin.coordinateLength  }} 

        }
        catch( err ){
            return { error: true, data: {code:500 , message: 'Failed to login '} };
        }
    };

    static async register ( body ) {
        const { email } = body
         if (!email) return { error: true, data: { code: 400 , message: 'invalid email!' } };

        function passwordGenerator() {   // <==  this function generates a random Password
            const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let password= '';
            for ( let i = 1; i <= 11; i++ ) {
                password += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return password  
        }

        try {
            const password = passwordGenerator()
            body.password = password 
            const newAdmin = await Admin.create( body )
            //  Nodemailer config:
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: 'javi23dsc@gmail.com', 
                  pass: 'exxyryzyvodidxcz', 
                },
              });        
            //  Mail being sent here:
              let info = await transporter.sendMail({
                from: 'Net-Global@gmail.ar', 
                to: `${ email }`, 
                subject: 'New Admin Creation', 
                text: 'New Admin has been successfully created',
                html: `
                <h1>   ¡Net Global New Admin Account! </h1>
                <p> Hi! Net Global Staff has created for you a new Admin account. A Security password has been automatically set, however you are able to modify it to what you most prefer. Regardless you can change your password in case you forget it, we extremely recommend not to delete this massage unless you have already modified your password to another one</p> 
                <h2 >Admin Email: <span style="color: #B51313; font-size: 33px;"> ${ email }</span> </h2>
                <h2> Password:  <span style="color: #B51313; font-size: 33px;"> ${ password }</span> </h2>
                <h4> SHARING THIS INFORMATION IS COMPLETELY PROHIBITED. </h4>
                <p> Cordially, Net Global. </p> `  
              }); 
    
            return { error: false, data: { code: 201, message: 'New Admin has been successfully created' } }
       
        } catch ( err ) {
            return { error: true, data: { code: 500, message: "Register failed" } }
        }
    };

    static async forgotPassword ( body ) {
        const { email } = body; 
         if (!email) return { error: true, data: { code: 400 , message: 'invalid Email!' } };
        const admin = await Admin.findOne({ where: { email } });

        function tokenGenerator(){  // <== Generates the random token
            let token = []
            for (let i=1; i<=4; i++) {  
             token.push(Math.floor(Math.random()*10)) 
            }
           return token.join('')
        }
        try {                              
            const token = tokenGenerator()
            admin.recoveryKey = token;
            await admin.save() // token saved

            //  Nodemailer config:
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: 'javi23dsc@gmail.com', 
                pass: 'exxyryzyvodidxcz', 
              },
            });
        
            //  Mail sending here:
            let info = await transporter.sendMail({
              from: 'Net-Global@gmail.ar', 
              to: 'javi11_97@hotmail.com',  //`${ email }`, 
              subject: 'Generate New Password', 
              text: 'This is your personal token so as to create your new password',
              html: `<p> This is your personal token key which will allow yu to create a new password. Please, make sure you will not share it to anybody. </p> 
              <h1> ${ token } </h1>`
            });   

            const { password, recoveryKey, ...adminInfo } = admin.dataValues  // avoid sensitive data from being sent
            return { error: false, data: adminInfo  }

        } catch ( err ) {
            return { error: true, data: { code: 400, message: 'Something went wrong' } }
        }
    };

    static async tokenVerification ( body ) {
        const { email, recoveryKey: token } = body;
    
        try {
            const admin = await Admin.findOne({ where: { email } })
            const isAdminValid = await bcrypt.compare( token , admin.recoveryKey )
            return { error: false, data: { code: 202, message: "Authirized with Token Key" } }

        } catch {
            res.status(401).send('Unauthorized')
            return { error: true, data: { code: 401, message: 'Unauthorized' } }
        }
    };

    static async newPassword ( body ) {
        const { password, email } = body; 
         if (!password && email) return { error: true, data: { code: 401, message: 'Unauthorized' } }
        const admin = await Admin.findOne({ where: { email } }) 
    
        try { 
            admin.password = password; 
            await admin.save()  // new password saved
            return { error: false, data: { code: 200, message: 'new password has been set correctly' } }

        } catch {
            return { error: true, data: { code: 500, message: 'Something went wrong' } }
        }


    }
    static async getAll(page){
        let admins;
        let totalPages = Math.ceil(await Admin.count()/30);
  
        if(page>=2){
          admins = await Admin.findAll({ offset: (page-1)*30, limit: 30 });
        }
        else{
          admins= await Admin.findAll({limit: 30});
        }
        return { error: false, data: {admins:admins, totalPages:totalPages} };
  
      } catch (error) {
        return { error: true, data: {error:error} };
      }
      static async getOne(id) {
          try {
            const admin = await Admin.findByPk(id);
            if(admin) return { error: false, data:{ id:admin.id , cuil:admin.cuil, email:admin.email ,superAdmin: admin.superAdmin, name: admin.name, lastName: admin.lastName, image: admin.image, recoveryKey: admin.recoveryKey }};
            return {error:true , data: {code:404}}
          } catch (error) {
            return { error: true, data: error };
          }
        }
        static async deleteOne(adminId) {
          try {
            await Admin.destroy({ where: { id: adminId } });
            return { error: false };
          } catch (error) {
            return { error: true, data: error };
          }
        }
        static async updateOne(body, adminId) {
          try{
              await Admin.update(body, { where: { id: adminId } });
              return { error: false};
          }
          catch(error){
              return { error: true, data: error };
          }
        }
     
}





module.exports = AdminServices