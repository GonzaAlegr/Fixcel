const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./src/Database/db.db', (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos db.db');
  }
});

// Registro de usasuario
const { PasswordEncriptar } = require('./src/Utils/hash');

app.post('/server/RegistrarUsuario', async (req, res) => {
  try {
    const { User, Password, Name, DNI, Email } = req.body;
    console.log(req.body);

    // Encriptado
    const hash = await PasswordEncriptar(Password);
    if (!hash) {
      return res.status(500).json({ error: 'No se pudo encriptar la contraseña' });
    }

    const query = `INSERT INTO USUARIOS (User, Password, Name, DNI, Email) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [User, hash, Name, DNI, Email], (err) => {
      if (err) {
        console.error('❌ Error al insertar usuario:', err.message);
        return res.status(500).json({ error: 'Error al registrar usuario' });
      }
      console.log('✅ Usuario insertado correctamente');
      res.json({ mensaje: 'Usuario registrado correctamente' });
    });
  } catch (error) {
    console.error('Error en servidor:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

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

app.get('/server/Productos', (req, res) => {
  const query = 'SELECT * FROM PRODUCTOS'
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    } else {
      res.json(rows)
    }
  })
})

app.listen(PORT, () => {
  console.log(`🦖 Servidor corriendo en http://localhost:${PORT}`);
});