const { Op } = require("sequelize");
const { Guard, Province } = require("../models");

class GuardServices {
  static async getAll() {
    try {
      const users = await Guard.findAll();
      return { error: false, data: users };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getOne(guardId) {
    try {
      const user = await Guard.findByPk(guardId);
      return { error: false, data: user };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async addOne(body) {
    try {
      const provincesData = body.provinces;
      delete body.provinces;
      const user = await Guard.create(body);
      const provinces = await Province.findAll({
        where: {
          id: { [Op.in]: provincesData },
        },
      });
      await user.addProvinces(provinces);
      return { error: false, data: user };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async deleteOne(guardId) {
    try {
      await Guard.destroy({ where: { id: guardId } });
      return { error: false };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async updateOne(body, guardId) {
    try {
      await Guard.update(body, { where: { id: guardId } });
      const user = await Guard.findByPk(guardId);
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
}

module.exports = GuardServices;
