const { Inactive,Guard } = require("../models");

class InactiveServices {
  static async addOne(body,guardId) {
    try {
      const inactivity = await Inactive.create(body);
      await inactivity.addGuard(guardId);
      return { error: false, data: inactivity };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async deleteOne(inactivityId) {
    try {
      await Inactive.destroy({ where: { id: inactivityId } });
      return { error: false };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async updateOne(body, inactivityId) {
    try {
      await Inactive.update(body, { where: { id: inactivityId } });
      return { error: false };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getAll(query) {
    if (query.guard) {
      try {
        const guard = await Guard.findByPk(query.guard);
        const inactivities = await guard.getInactivities()
        return { error: false, data: inactivities };
      } catch (error) {
        return { error: true, data: error };
      }
    } else {
      try {
        const inactivities = await Inactive.findAll({
            include:{
                model:Guard,
            }
        });
        return { error: false, data: inactivities };
      } catch (error) {
        return { error: true, data: error };
      }
    } 
  }
}

module.exports = InactiveServices;
