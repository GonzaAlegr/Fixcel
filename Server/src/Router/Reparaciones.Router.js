const express = require('express');
const Rutas = express.Router();

const {
    RegistrarReparacion,
    ObtenerReparaciones
} = require('../Controller/Reparaciones.Controller');

Rutas.post('/reparaciones/registrar', RegistrarReparacion);

Rutas.get('/reparaciones', ObtenerReparaciones);

module.exports = Rutas;