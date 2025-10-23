const express = require('express');

const Rutas = express.Router();

const { RegistrarReparacion } = require('../Controllers/Reparaciones.controller');

Rutas.post('/reparaciones/registrar', RegistrarReparacion);

module.exports = Rutas;
