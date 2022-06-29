const { Op } = require("sequelize");
const { Guard, Province, Assignment } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      if (!guard) return { error: true, data:{code:404,message:"La cuenta no se encuentra registada"}}
      const isValid= await bcrypt.compare( body.password, guard.password)
      if (!isValid) return { error: true, data: {code:401,message:"Contraseña incorrecta"}}
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
  }
}

module.exports = GuardServices;
