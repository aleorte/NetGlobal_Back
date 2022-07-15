const AdminServices = require("../services/adminServices")

class AdminController { 

    static async register (req, res) {       
      const { error, data } = await AdminServices.register( req.body )
       if(data.code === 201) {return res.status(201).send(data)}
      if (error === true) {
        if(data.code === 400) {return res.status(400).send(data)}
        return res.status(500).send(data)
        }
    }  

    static async login(req,res) {           
            const {error,data} = await AdminServices.login(req.body)
              if (error) {
                if(data.code === 404) return res.status(404).send(data)
                 return res.status(401).send(data)
              }
             return  res.status(200).send(data)
    }   

    static async forgotPassword (req, res) {
        try {
            const { error, data } = await AdminServices.forgotPassword( req.body )
            if (data) res.status(200).send(data)    
        } catch ( error ) {
            res.status(400).send({ message: 'Something went wrong' })
        }
    }

    static async tokenVerification (req, res) {
     
            const { error, data } = await AdminServices.tokenVerification( req.body )
            if (error) return res.status(401).send(error)
            else return res.status(202).send(data)
        
    }

    static async newPassword (req, res) {
        try {
            const { error, data } = await AdminServices.newPassword( req.body )
              if (data) return res.status(200).send(data) 
        } catch (error) {
            res.status(500).send(error)
        }
    }
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

module.exports = AdminController

// Services => pedidos a la base de datosss
// la respuesta la guardo en una variable y la res-sendeo