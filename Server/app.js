const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

const loginRouter = require('./src/Router/Login.Router.js');
app.use('/server', loginRouter);

// Conexión a la base de datos
const db = new sqlite3.Database('./src/Database/db.db', (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos db.db');
  }
});

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

app.post('/server/IniciarSesion', (req, res) => {
  const { User, Password } = req.body;

  const query = 'SELECT * FROM USUARIOS WHERE User = ? AND Password = ?';
  db.get(query, [User, Password], (err, row) => {
    if (err) {
      console.error('❌ Error al consultar la base de datos:', err.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else if (!row) {
      res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    } else {
      res.json({ message: 'Inicio de sesión exitoso', usuario: row });
    }
  });
});

// Rutas antiguas (no las borramos)
app.post('/server/RegistrarProducto', async (req, res) => {
  try {
    const { Brand, Model, Description, Stock, Price, Imagen } = req.body;
    console.log(req.body);
    const query = `INSERT INTO PRODUCTOS (Brand, Model, Description, Stock, Price, Imagen) VALUES (?, ?, ?, ?, ?, ?)`;
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

// Rutas nuevas de FuncionesProductos
const FuncionesProductosRouter = require('./src/Router/FuncionesProductos.Router');
app.use('/api', FuncionesProductosRouter);


// Servidor
app.listen(PORT, () => {
  console.log(`🦖 Servidor corriendo en http://localhost:${PORT}`);
});
