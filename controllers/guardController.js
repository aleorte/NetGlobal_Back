const GuardServices = require("../services/guardServices");

class GuardController {

  static async getAll(req, res) {
    const { error, data } = await GuardServices.getAll(req.query.page);
    if (error) {
      return res.status(500).send(data);
    }
    res.status(200).send(data);
  };

  static async getOne(req, res) {
    const { error, data } = await GuardServices.getOne(req.params.id);
    if (error) {
      return res.status(500).send(data);
    }
    return res.status(200).send(data);
  };


  static async updateOne(req, res) {
    const { error, data } = await GuardServices.updateOne(
      req.body,
      req.params.id
    );
    if (error) {
      if(data.code) { return res.status(400).send(data)}
      return res.status(500).send(data);
          }
    return res.sendStatus(204);
  };

  static async getLicenses(req, res) {
    const { error, data } = await GuardServices.getLicenses(req.params.id);
    if (error) {
      return res.status(500).send(data);
    }
    res.status(200).send(data);
  };

  static async addLicenses(req, res) {
    const { error, data } = await GuardServices.addLicenses(req.body);
    if (error) {
      return res.status(500).send(data);
    }
    res.status(201).send(data);
  };

  static async getWorkedHours(req, res) {
    const { error, data } = await GuardServices.getWorkedHours(
        req.params.id,
        req.query.month
      );

    if (error) {
      return res.status(500).send(data);
    }
    res.status(201).send(data);
  };

  static async login(req, res){
    try {
      const {error,data} = await GuardServices.login(req.body)
       if (data) res.status(202).send(data)

    } catch(error) {
        res.status(500).send(data)
    }
  };

  static async register (req, res) {
      const { error,data } = await GuardServices.register( req.body )
      if(data.code === 201) {return res.status(201).send(data)}
      if(data.code === 400) {return res.status(400).send(data)}
       if (error) {
       return  res.status(500).send(data)
    }
  };
  
  static async forgotPassword (req, res) { // CHEQUEAR

      const { error,data } = await GuardServices.forgotPassword( req.body )
       if (data) return res.status(200).send(data)

      res.status(400).send({ message: 'Something went wrong' })
    
  };

  static async tokenVerification (req, res) {
  
      const { error, data } = await GuardServices.tokenVerification( req.body )
       if(data) return res.status(202).send(data)
      res.status(500).send(error)
    
  }
  static async  newPassword (req, res) {
 
      const { error, data } = await GuardServices.newPassword( req.body )
        if (data) return res.status(200).send(data) 
        res.status(500).send(error)
    
  }
}

module.exports = GuardController;
