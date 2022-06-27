const AssignmentServices = require("../services/assignmentServices");

class AssignmentController {

  static async addOne(req, res) {
    const { error, data } = await AssignmentServices.addOne(req.body);
    if (error) {
      return res.status(500).send(data);
    }
    return res.status(201).send(data);
  }
  // static async deleteOne(req, res) {
  //   const { error, data } = await AssignmentServices.deleteOne(req.params.id);
  //   if (error) {
  //     return res.status(500).send(data);
  //   }
  //   return res.sendStatus(204);
  // }
  static async updateOne(req, res) {
    const { error, data } = await AssignmentServices.updateOne(req.body,req.params.id);
    if (error) {
      return res.status(500).send(data);
    }
    return res.sendStatus(204);
  }

}

module.exports = AssignmentController;