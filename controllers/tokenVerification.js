const bcrypt = require('bcrypt');
const { Guard }= require ('../models')

const tokenVerification = async (req, res) => {
    const { email, recoveryKey: token } = req.body;
    
    try {
        const guard = await Guard.findOne({ where: { email } });
        const isGuardValidWithToken = await bcrypt.compare(token , guard.recoveryKey)
        res.status(202).send("Authirized with Token Key")
    } catch {
        res.status(401).send('Unauthorized')
    }
}

module.exports = tokenVerification;