const Express= require('express')
const Rutas= Express.Router()

const{EnviarCorreo}=require('../Controller/Enviar.Controller')

Rutas.post('/EnviarEmail',EnviarCorreo)

module.exports = Rutas;