const { Assignment, Branch, Guard } = require("../models");
const moment = require('moment');
class AssignmentServices {
  static async addOne(body) {
    // if (body.endTime < new Date(Date.now()).toDateString()){ return {error:true , data:{message:"Cannot create an assignment that takes place during a  past date"}}}
    if(!body.guardId){ return { error: true, data: 'Assign a guard' }}
    try {
      const assignment = await Assignment.create({
        date: body.date,
        month: body.month,
        startTime: body.startTime,
        endTime: body.endTime,
        notes:body.notes
      });
      await assignment.setBranch(body.branchId);
      await assignment.setAdmin(body.adminId);
      const guard = await Guard.findByPk(body.guardId)
      const assignments = await guard.getAssignments(); 
      for (let i=0; i<assignments.length; i++ ){
        if (assignments[i].date === body.date){
          return { error: true, data: {message:'Guard is busy'} }
        }
      }
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
      const assignment = await Assignment.findByPk(assignmentId);
      if (assignment.endTime < new Date(Date.now())){ return {error:true , data:{message:"Cannot edit an assignment past it's date"}}}
      if( new Date(body.realEndTime) > new Date(assignment.endTime)){ body.realEndTime = assignment.endTime}
      console.log(body)
      await Assignment.update(body, { where: { id: assignmentId } });
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
        let assignments;
        const guard = await Guard.findByPk(query.guard)
        const name = guard.lastName + " " +  guard.name
        let result = [];
        if(query.month){
          assignments = await Assignment.findAll({
              where: {
                guardId: query.guard,
                month: query.month
              }
          });
          result = await Promise.all(assignments.map(async(assignment)=>{
            const assignment2 = {...assignment.dataValues}
            assignment2.branch = await assignment.getBranch()
            assignment2.name = name
            return assignment2
          }))
        }
        else
        {
          assignments = await Assignment.findAll({

              where: {
                guardId: query.guard,
              }
            
          });
          result = await Promise.all(assignments.map(async(assignment)=>{
            const assignment2 = {...assignment.dataValues}
            assignment2.name = name
            assignment2.branch = await assignment.getBranch()
            return assignment2
          }))
          
        }
        const result2 = result.sort((a,b)=> Number(a.date.split("-").join("")) - Number(b.date.split("-").join("")))
        return { error: false, data: result2 };
      } 
      catch (error) {
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
        const result2 = assignments.sort((a,b)=> Number(a.date.split("-").join("")) - Number(b.date.split("-").join("")))
        return { error: false, data: result2 };
      } catch (error) {
        return { error: true, data: error };
      }
    }
  }
}

module.exports = AssignmentServices;
