const express = require('express');
const Rutas = express.Router();

const { RegistrarProducto, VerProductos } = require('../Controller/Productos.Controller');

// Registrar producto (con imagen como texto)
Rutas.post('/productos/registrar', RegistrarProducto);

// Ver todos los productos
Rutas.get('/productos/ver', VerProductos);

module.exports = Rutas;
