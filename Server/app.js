require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

// DEBUG: verificar que el JWT_SECRET cargó bien
console.log("JWT_SECRET CARGADO:", process.env.JWT_SECRET);

// MIDDLEWARES
app.use(session({
  secret: "fixcel-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax"
  }
}));

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routers
const loginRouter = require('./src/Router/Login.Router.js');
app.use('/server', loginRouter);

const CarritoRutas = require('./src/Router/Carrito.Router.js');
app.use('/carrito', CarritoRutas);

const NewsletterRouter = require('./src/Router/Newsletter.Router.js');
app.use('/newsletter', NewsletterRouter); 

const ReparacionesRouter = require('./src/Router/Reparaciones.Router.js');
app.use('/reparacion', ReparacionesRouter);

// Funciones de Productos
const FuncionesProductosRouter = require('./src/Router/FuncionesProductos.Router');
app.use('/api/productos', FuncionesProductosRouter);

// Emails personalizados
const router = require('./src/Router/Enviar.Routes');
app.use('/api/email', router);

// Conexion a la base de datos
const db = new sqlite3.Database('./src/Database/db.db', (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos db.db');
  }
});

// Rutas de productos

app.get('/api/productos/all', (req, res) => {
  const query = 'SELECT * FROM PRODUCTOS';
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM PRODUCTOS WHERE ID = ?';

  db.get(query, [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'Error al obtener producto' });
    if (!row) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(row);
  });
});

app.post('/api/productos/Registrar', async (req, res) => {
  try {
    const { Brand, Model, Description, Stock, Price, Imagen } = req.body;

    const query = `
      INSERT INTO PRODUCTOS 
      (Brand, Model, Description, Stock, Price, Imagen) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [Brand, Model, Description, Stock, Price, Imagen], (err) => {
      if (err) return res.status(500).json({ error: 'Error al registrar producto' });

      res.json({ mensaje: 'Producto registrado correctamente' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🦖 Servidor corriendo en http://localhost:${PORT}`);
});