const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routers principales
const loginRouter = require('./src/Router/Login.Router.js');
app.use('/server', loginRouter);

const CarritoRutas = require('./src/Router/Carrito.Router.js');
app.use('/server', CarritoRutas);

const NewsletterRouter = require('./src/Router/Newsletter.Router.js');
app.use('/server', NewsletterRouter);

const ReparacionesRouter = require('./src/Router/Reparaciones.Router.js');
app.use('/server', ReparacionesRouter);

// FuncionesProductos
const FuncionesProductosRouter = require('./src/Router/FuncionesProductos.Router');
app.use('/api', FuncionesProductosRouter);

// Emails personalizados
const router = require('./src/Router/Enviar.Routes');
app.use('/api', router);

// =====================================================
// CONEXIÓN A LA BASE DE DATOS
// =====================================================
const db = new sqlite3.Database('./src/Database/db.db', (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos db.db');
  }
});

// =====================================================
// RUTAS DE PRODUCTOS (sí deben quedar en app.js)
// =====================================================

// Obtener todos los productos
app.get('/server/Productos', (req, res) => {
  const query = 'SELECT * FROM PRODUCTOS';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Obtener un producto por ID
app.get('/server/Productos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM PRODUCTOS WHERE ID = ?';

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error('❌ Error al obtener producto:', err.message);
      return res.status(500).json({ error: 'Error al obtener producto' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(row);
  });
});

// Registrar un producto
app.post('/server/RegistrarProducto', async (req, res) => {
  try {
    const { Brand, Model, Description, Stock, Price, Imagen } = req.body;
    console.log(req.body);

    const query = `INSERT INTO PRODUCTOS 
      (Brand, Model, Description, Stock, Price, Imagen) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(query, [Brand, Model, Description, Stock, Price, Imagen], (err) => {
      if (err) {
        console.error('❌ Error al crear producto', err.message);
        return res.status(500).json({ error: 'Error al registrar producto' });
      }

      console.log('✅ Producto insertado correctamente');
      res.json({ mensaje: 'Producto registrado correctamente' });
    });
  } catch (error) {
    console.error('Error en servidor:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// =====================================================
// SERVIDOR
// =====================================================
app.listen(PORT, () => {
  console.log(`🦖 Servidor corriendo en http://localhost:${PORT}`);
});