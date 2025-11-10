const express = require('express');
const Rutas = express.Router();
const { SuscribirNewsletter } = require('../Controller/Newsletter.Controller.js');

Rutas.post('/suscribir', SuscribirNewsletter);

module.exports = Rutas;