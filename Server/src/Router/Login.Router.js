const express = require('express')
const Rutas = express.Router()

const { 
    LoginRegister, 
    LoginUser, 
    VerificarCuenta 
} = require('../Controller/Login.Controller.js')

// REGISTRO
Rutas.post('/RegistrarUsuario', LoginRegister)

// LOGIN
Rutas.post('/IniciarSesion', LoginUser)

// VERIFICAR CUENTA
Rutas.get('/verificar/:token', VerificarCuenta)

module.exports = Rutas