const { Op } = require("sequelize");
const { Guard, Province, Assignment } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

class GuardServices {
  static async getAll(page) {
    try {
      let users;
      let totalPages = Math.ceil(await Guard.count()/30);

      if(page>=2){
        users = await Guard.findAll({ offset: (page-1)*30, limit: 30 });
      }
      else{
        users= await Guard.findAll({limit: 30});
      }
      return { error: false, data: {users:users,totalPages:totalPages} };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getOne(guardId) {
    try {
      const user = await Guard.findByPk(guardId);
      return { error: false, data: user};
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async addOne(body) {
    try {
      const licenses = body.licenses;
      delete body.licenses;
      const user = await Guard.create(body);
      const provinces = await Province.findAll({
        where: {
          id: { [Op.in]: licenses },
        },
      });
      await user.addProvinces(provinces);
      return { error: false, data: user };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async updateOne(body, guardId) {
    try {

      await Guard.update(body, { where: { id: guardId } });
      const user = await Guard.findByPk(guardId);
      if(user.active ===false)
      { console.log("entro")

        const today = new Date();
        console.log(today)
        await Assignment.destroy({
            where: {
              guardId: guardId,
              state: "PENDING",
              startTime: {
                [Op.gte]: today,
              },
            },
          });
      }
      const provinces = await Province.findAll({
        where: {
          id: { [Op.in]: body.provinces },
        },
      });
      await user.setProvinces(provinces);


      return { error: false };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getLicenses(guardId) {
    try {
      const user = await Guard.findByPk(guardId);
      const licenses = await user.getProvinces();
      return { error: false, data: licenses };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getWorkedHours(guardId, month) {
    try {
      let assignments;
      const guard = await Guard.findByPk(guardId);

      if (month) {
        assignments = await guard.getAssignments({ where: { month: month } });
      } else {
        assignments = await guard.getAssignments();
      }
      const workedHours = assignments.reduce((acc, assignment) => {
        return assignment.state === "COMPLETED"
          ? acc + Number(assignment.workedHours)
          : acc;
      }, 0);

      return { error: false, data: `${workedHours}` };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async login(body){
    try{
      const guard= await Guard.findOne({ where: { email: body.email } })
      if (!guard) return { error: true, data:{code:404,message: 'invalid email or password!' }}
      const isValid= await bcrypt.compare( body.password, guard.password)
      if (!isValid) return { error: true, data: {code:401,message: 'invalid email or password!' }}
            const guardToken = {
               id: guard.id,
               email: guard.email,
             } 
                     //sign toma un usuario y una clave y devuelve un token de autenticacion 
          const token = jwt.sign(guardToken, process.env.TOKEN_SECRET,{expiresIn: "720m"});
            let {password,...employee} = guard.dataValues 
            return { error: false, data: {...employee, token} };

    }
    catch(error){
      return { error: true, data: {code:500 , message: 'Failed to login '} };
    }
  };

static async register ( body ) {

    const { email } = body
     if (!email) return res.status(400).send({ message: 'invalid email or password!' })
   
    function passwordGenerator() {   // <==  this function generates a random Password
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password= '';
    for ( let i = 1; i <= 11; i++ ) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
    }   

  try {
      const password = "123"  // passwordGenerator() should go here instead of "123"
      const newGuard = await Guard.create( body )
      newGuard.password = password
      newGuard.save()

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

      return { error: false, data: { code: 201, message: "New Guard Account has been successfully created" } }

    } catch ( err ) {
      return { error: true, data: { code: 500, message: "Register failed" } }
    };
   };

  static async forgotPassword ( body ) {
    console.log("token")

    const { email } = body; 
     if (!email) return { error: true, data: { code: 400 , message: 'invalid Email!' } };
    const guard = await Guard.findOne({ where: { email } });

    function tokenGenerator(){  // <== Generates the random token
      let token = []
      for (let i=1; i<=4; i++) {  
       token.push(Math.floor(Math.random()*10)) 
      }
     return token.join('')
    }
    console.log("token")

    try {                              
      const token = tokenGenerator()
      guard.recoveryKey = token;
      console.log("token = "+ token)
      console.log(guard)
      await guard.save() // token saved
      console.log("hola") // aca ya falló el código

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
        to: `${ email }`,
        subject: 'Generate New Password', 
        text: 'This is your personal token so as to create your new password',
        html: `<p> This is your personal token key which will allow yu to create a new password. Please, make sure you will not share it to anybody. </p> 
        <h1> ${ token } </h1>`
      }); 
      console.log("token = "+ token)

      
      const { password, recoveryKey, ...guardInfo } = guard.dataValues // avoid sensitive data from being sent
      return { error: false, data: guardInfo  }

    } catch ( err ) {
      return { error: true, data: { code: 400, message: 'Something went wrong' } }
    }
  };

  static async tokenVerification ( body ) {
    const { email, recoveryKey: token } = body;

    try {
      const guard = await Guard.findOne({ where: { email } });
      console.log(token)
      const isGuardValid = await bcrypt.compare(token , guard.recoveryKey)
      return { error: false, data: { code: 202, message: "Authirized with Token Key" } }

    } catch {
      return { error: true, data: { code: 401, message: 'Unauthorized' } }
    }
  };

  static async newPassword ( body ) {
    const { password, email } = body; 
      if (!password && email) return { error: true, data: { code: 401, message: 'Unauthorized' } }
    const guard = await Guard.findOne({ where: { email } }) 

    try { 
      guard.password = password; 
      console.log("hola")
      await guard.save()    // new password saved
      console.log("hola")
      return { error: false, data: { code: 200, message: 'new password has been set correctly' } }

    } catch {
      return { error: true, data: { code: 401, message: 'Something went wrong' } }
    }
  }
}

module.exports = GuardServices;
