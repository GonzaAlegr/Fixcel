const jwt = require('jsonwebtoken')
require('dotenv').config()

// Genera token válido 24 hs
function generarToken(email) {
  return jwt.sign(
    { email },
    process.env.JWT_SECRET || "clave_secreta_segura",
    { expiresIn: "24h" }
  )
}

function verificarToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || "clave_secreta_segura")
}

module.exports = { generarToken, verificarToken }
