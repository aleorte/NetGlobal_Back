const bcrypt = require('bcrypt');
const { Admin }= require ('../models')

const tokenVerificationAdmin = async (req, res) => {
    const { email, recoveryKey: token } = req.body;

    try {
        const admin = await Admin.findOne({ where: { email } })
        const isAdminValidWithToken = await bcrypt.compare(token , admin.recoveryKey)
        res.status(202).send("Authirized with Token Key")
    } catch {
        res.status(401).send('Unauthorized')
    }
}

module.exports = tokenVerificationAdmin;