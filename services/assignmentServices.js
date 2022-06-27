const {Assignment} = require("../models");

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
  // static async deleteOne(guardId) {

  // }
    static async updateOne(body, assignmentId) {

      try {
        await Assignment.update(body, { where: { id: assignmentId } });
        const assignment = await Assignment.findByPk(assignmentId);
        if(assignment.realStartTime && assignment.realEndTime)
        {
          let workedHours = (assignment.realEndTime - assignment.realStartTime)/1000/60/60;
          await Assignment.update({ workedHours: workedHours,state: "COMPLETED"}, { where: { id: assignmentId } });
        }
        return { error: false };
      } catch (error) {
        return { error: true, data: error };
      }
    }

}

module.exports = AssignmentServices;
