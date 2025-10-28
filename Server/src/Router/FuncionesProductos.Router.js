const express = require('express');
const Rutas = express.Router();

const {
    RegistrarProducto,
    VerProductos,
    ModificarProducto,
    EliminarProducto
} = require('../Controller/FuncionesProductos.Controller');

// === Registrar producto ===
Rutas.post('/productos/registrar', RegistrarProducto);

// === Ver todos los productos ===
Rutas.get('/productos/ver', VerProductos);

// === Modificar producto por ID ===
Rutas.put('/productos/modificar/:id', ModificarProducto);

// === Eliminar producto por ID ===
Rutas.delete('/productos/eliminar/:id', EliminarProducto);

module.exports = Rutas;
