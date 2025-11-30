const express = require('express');
const Rutas = express.Router();

const { AgregarAlCarrito, ObtenerCarrito, EliminarDelCarrito } = require('../Controller/Carrito.Controller');

Rutas.post('/AgregarAlCarrito', AgregarAlCarrito);

Rutas.get('/Carrito/:user', ObtenerCarrito);

Rutas.delete('/EliminarDelCarrito/:id', EliminarDelCarrito);

module.exports = Rutas;