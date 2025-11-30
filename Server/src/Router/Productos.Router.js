const express = require('express');
const Rutas = express.Router();

const { RegistrarProducto, VerProductos } = require('../Controller/Productos.Controller');

Rutas.post('/productos/registrar', RegistrarProducto);

Rutas.get('/productos/ver', VerProductos);

module.exports = Rutas;
