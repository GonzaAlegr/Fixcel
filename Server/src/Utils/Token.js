const jwt = require('jsonwebtoken')
require('dotenv').config()

function GenerarToken(email) {
    return jwt.sign(
        { Email: email },                       
        process.env.JWT_SECRET,               
        { expiresIn: "1d" }                      
    )
}

function VerificarToken(token) {
    return jwt.verify(
        token,
        process.env.JWT_SECRET
    )
}

module.exports = { GenerarToken, VerificarToken }