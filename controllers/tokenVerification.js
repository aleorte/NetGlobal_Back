const {Guard}= require ('../models')

const tokenVerification = async (req, res) => {
    const { token } = req.body;
    
    try {
        const guard = await Guard.findOne({ where: { recoveryKey: token } });
        const {password,...guardInfo} = guard.dataValues 
        res.status(202).send(guardInfo)
    } catch {
        res.status(401).send('Unauthorized')
    }
}

module.exports = tokenVerification;