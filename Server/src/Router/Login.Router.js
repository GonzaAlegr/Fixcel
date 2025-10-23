const express= require('express')

const Rutas=express.Router()

const {LoginRegister}=require('../Controller/Login.Controller')


Rutas.post('/RegistrarUsuario', LoginRegister)

module.exports=Rutas;