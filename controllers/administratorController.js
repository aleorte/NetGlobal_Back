const AdminServices = require("../services/adminServices");

class AdministratorController {
  static async getAll(req, res) {
    const { error, data } = await AdminServices.getAll(req.query.page);
    if (error) {
      return res.status(500).send(data);
    }
    res.status(200).send(data);
  }

  static async getOne(req, res) {
    const { error, data } = await AdminServices.getOne(req.params.id);
    if (error) {
      if (data.code) {return res.status(404).send("Admin does not exist ")}
      return res.status(500).send(data);
    }
    return res.status(200).send(data);
  }

  static async deleteOne(req, res) {
    const { error, data } = await AdminServices.deleteOne(req.params.id);
    if (error) {
      return res.status(500).send(data);
    }
    return res.sendStatus(204);
  }
  static async updateOne(req, res) {
    const { error, data } = await AdminServices.updateOne(
      req.body,
      req.params.id
    );
    if (error) {
      return res.status(500).send(data);
    }
    return res.sendStatus(204);
  }



}

module.exports = AdministratorController;