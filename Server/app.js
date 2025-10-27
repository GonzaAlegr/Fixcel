// 1️⃣ Importaciones
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// 2️⃣ Configuración inicial
const app = express();
const PORT = 4000; // o el puerto que uses

app.use(express.json());
app.use(cors());

// 3️⃣ Conexión a la base de datos
const db = new sqlite3.Database('./src/Database/db.db', (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos db.db');
  }
});

// 4️⃣ Ruta para registrar usuario
app.post('/server/RegistrarUsuario', (req, res) => {
  const { User, Password, Name, DNI } = req.body;
  console.log(req.body);

  const query = `INSERT INTO USUARIOS (User, Password, Name, DNI) VALUES (?, ?, ?, ?)`;
  db.run(query, [User, Password, Name, DNI], (err) => {
    if (err) {
      console.error('❌ Error al insertar usuario:', err.message);
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    console.log('✅ Usuario insertado correctamente');
    res.json({ mensaje: 'Usuario registrado correctamente' });
  });
});

// 5️⃣ Iniciar servidor
app.listen(PORT, () => {
  console.log(`🦖 Servidor corriendo en http://localhost:${PORT}`);
});