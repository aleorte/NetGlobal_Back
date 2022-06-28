const InactiveServices = require("../services/inactiveServices");

class InactiveController {
  static async addOne(req, res) {
    const { error, data } = await InactiveServices.addOne(req.body,req.params.id);
    if (error) {
      return res.status(500).send(data);
    }
    return res.status(201).send(data);
  }
  static async deleteOne(req, res) {
    const { error, data } = await InactiveServices.deleteOne(req.params.inactivityId);
    if (error) {
      return res.status(500).send(data);
    }
    return res.sendStatus(204);
  }
  static async updateOne(req, res) {
    const { error, data } = await InactiveServices.updateOne(req.body,req.params.inactivityId);
    if (error) {
      return res.status(500).send(data);
    }
    return res.sendStatus(204);
  }
  static async getAll(req, res) {
    const { error, data } = await InactiveServices.getAll(req.query);
    if (error) {
      return res.status(500).send(data);
    }
    res.status(201).send(data);
  }
}

module.exports = InactiveController;
