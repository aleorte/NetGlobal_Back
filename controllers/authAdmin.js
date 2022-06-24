const jwt=require('jsonwebtoken');

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwYXVsQG1haWwuY29tIiwiaWF0IjoxNjU2MDkyNjcyfQ.OdUtOohrsoIcPPD9bTzRfbIDe521dfvGizU9glRR24I"
const authAdmin = async(req,res)=>{
    let token = null
    let decodedToken={} 
    try{
      const authorization = req.get('authorization')
      if (authorization && authorization.toLowerCase().startsWith('bearer')){
         token = authorization.substring(7)
      }
      decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
      res.send(decodedToken)
    }
    catch(err){
        res.status(401).send({message:'Token missing'})
    }
}

module.exports = authAdmin