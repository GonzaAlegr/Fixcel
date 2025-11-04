const express = require('express')
const Rutas = express.Router()
const { LoginRegister, LoginUser } = require('../Controller/Login.Controller.js')

Rutas.post('/RegistrarUsuario', LoginRegister)
Rutas.post('/IniciarSesion', LoginUser)

module.exports = Rutas