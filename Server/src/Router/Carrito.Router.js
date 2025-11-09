const express = require('express');
const Rutas = express.Router();

const { AgregarAlCarrito, ObtenerCarrito, EliminarDelCarrito } = require('../Controller/Carrito.Controller');

// 🛒 Agregar producto al carrito
Rutas.post('/AgregarAlCarrito', AgregarAlCarrito);

// 🧾 Obtener productos del carrito de un usuario
Rutas.get('/Carrito/:user', ObtenerCarrito);

// ❌ Eliminar producto del carrito
Rutas.delete('/EliminarDelCarrito/:id', EliminarDelCarrito);

module.exports = Rutas;