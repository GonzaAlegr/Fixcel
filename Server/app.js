const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
const db = new sqlite3.Database('./src/Database/db.db', (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos db.db');
  }
});

// Rutas antiguas (no las borramos)
app.post('/server/RegistrarProducto', async (req, res) => {
  try {
    const { Brand, Model, Description, Stock, Price } = req.body;
    console.log(req.body);
    const query = `INSERT INTO PRODUCTOS (Brand, Model, Description, Stock, Price) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [Brand, Model, Description, Stock, Price], (err) => {
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

// Rutas nuevas de FuncionesProductos
const FuncionesProductosRouter = require('./src/Router/FuncionesProductos.Router');
app.use('/api', FuncionesProductosRouter);

// Servidor
app.listen(PORT, () => {
  console.log(`🦖 Servidor corriendo en http://localhost:${PORT}`);
});
