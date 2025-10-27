const express = require('express');

const Rutas = express.Router();

const { RegistrarProducto } = require('../Controller/Productos.Controller');

Rutas.post('/productos/registrar', RegistrarProducto);

module.exports = Rutas;
