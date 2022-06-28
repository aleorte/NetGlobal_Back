const { Assignment } = require("../models");

class AssignmentServices {
  static async addOne(body) {
    try {
      const assignment = await Assignment.create({
        date: body.date,
        month: body.month,
        startTime: body.startTime,
        endTime: body.endTime,
      });
      await assignment.setBranch(body.branchId);
      await assignment.setAdmin(body.adminId);
      await assignment.setGuard(body.guardId);

      return { error: false, data: assignment };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async deleteOne(assignmentId) {
    try {
      await Assignment.destroy({ where: { id: assignmentId } });
      return { error: false };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async updateOne(body, assignmentId) {
    try {
      await Assignment.update(body, { where: { id: assignmentId } });
      const assignment = await Assignment.findByPk(assignmentId);
      if(assignment.realStartTime && !assignment.realEndTime){
        await Assignment.update(
          {state: "IN PROCESS" },
          { where: { id: assignmentId } }
        );
      }
      if (assignment.realStartTime && assignment.realEndTime) {
        let workedHours =
          (assignment.realEndTime - assignment.realStartTime) / 1000 / 60 / 60;
        await Assignment.update(
          { workedHours: workedHours, state: "COMPLETED" },
          { where: { id: assignmentId } }
        );
      }
      return { error: false };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  static async getAll(query) {
    if (query.guard) {
      try {
        let users;
        if(query.month){
          users = await Assignment.findAll({
            where: {
              guardId: query.guard,
              month: query.month
            },
          });
        }
        else
        {
          users = await Assignment.findAll({
            where: {
              guardId: query.guard,
            },
          });
        }
        return { error: false, data: users };
      } catch (error) {
        return { error: true, data: error };
      }
    } else if (query.branch) {
      try {

        let branch;
        if(query.month){
          branch = await Assignment.findAll({
            where: {
              branchId: query.branch,
              month: query.month
            },
          });
        }
        else
        {
          branch = await Assignment.findAll({
            where: {
              branchId: query.branch,
            },
          });
        }
        return { error: false, data: branch };
      } catch (error) {
        return { error: true, data: error };
      }
    } else {
      try {
        const assignments = await Assignment.findAll();
        return { error: false, data: assignments };
      } catch (error) {
        return { error: true, data: error };
      }
    }
  }
}

module.exports = AssignmentServices;
