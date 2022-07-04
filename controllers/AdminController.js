const AdminServices = require("../services/adminServices")

class AdminController { 

    static async register (req, res) {       
        try {
            const { error, data } = await AdminServices.register( req.body )
            if (data) res.send(data)
        } catch (error) {
            res.status(500).send(error)
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
        try {
            const { error, data } = await AdminServices.tokenVerification( req.body )
             if (data) res.status(202).send(data)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static async newPassword (req, res) {
        try {
            const { error, data } = await AdminServices.newPassword( req.body )
              if (data) return res.status(200).send(data) 
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = AdminController

// Services => pedidos a la base de datosss
// la respuesta la guardo en una variable y la res-sendeo