const express = require('express');

const Rutas = express.Router();

const { RegistrarReparacion } = require('../Controller/Reparaciones.Controller');

Rutas.post('/reparaciones/registrar', RegistrarReparacion);

module.exports = Rutas;
