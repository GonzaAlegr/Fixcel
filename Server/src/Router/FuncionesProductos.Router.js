const express = require('express');
const Rutas = express.Router();

const {
    RegistrarProducto,
    VerProductos,
    ModificarProducto,
    EliminarProducto
} = require('../Controller/FuncionesProductos.Controller');

Rutas.post('/productos/registrar', RegistrarProducto);

Rutas.get('/productos/ver', VerProductos);

Rutas.put('/productos/modificar/:id', ModificarProducto);

Rutas.delete('/productos/eliminar/:id', EliminarProducto);

module.exports = Rutas;
