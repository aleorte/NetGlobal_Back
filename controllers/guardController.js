const GuardServices = require("../services/guardServices");

class GuardController {
  static async getAll(req, res) {
    const { error, data } = await GuardServices.getAll(req.query.page);
    if (error) {
      return res.status(500).send(data);
    }
    res.status(200).send(data);
  }

  static async getOne(req, res) {
    const { error, data } = await GuardServices.getOne(req.params.id);
    if (error) {
      return res.status(500).send(data);
    }
    return res.status(200).send(data);
  }
  static async addOne(req, res) {
    const { error, data } = await GuardServices.addOne(req.body);
    if (error) {
      return res.status(500).send(data);
    }
    return res.status(201).send(data);
  }

  static async updateOne(req, res) {
    const { error, data } = await GuardServices.updateOne(
      req.body,
      req.params.id
    );
    if (error) {
      return res.status(500).send(data);
    }
    return res.sendStatus(204);
  }
  static async getLicenses(req, res) {
    const { error, data } = await GuardServices.getLicenses(req.params.id);
    if (error) {
      return res.status(500).send(data);
    }
    res.status(200).send(data);
  }

  static async addLicenses(req, res) {
    const { error, data } = await GuardServices.addLicenses(req.body);
    if (error) {
      return res.status(500).send(data);
    }
    res.status(201).send(data);
  }
  static async getWorkedHours(req, res) {
    const { error, data } = await GuardServices.getWorkedHours(
        req.params.id,
        req.query.month
      );

    if (error) {
      return res.status(500).send(data);
    }
    res.status(201).send(data);
  }
}

module.exports = GuardController;
