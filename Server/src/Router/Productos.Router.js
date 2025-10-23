const express = require('express');

const Rutas = express.Router();

const { RegistrarProducto } = require('../Controllers/Productos.controller');

Rutas.post('/productos/registrar', RegistrarProducto);

module.exports = Rutas;
