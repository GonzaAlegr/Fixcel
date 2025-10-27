const db = require('../DataBase/db');
const { PasswordEncriptar } = require('../Utils/hash');


const LoginRegister = async (req, res) => {
  try {
    const { User, Password, Name, DNI, Email } = req.body;

    
    if (!User || !Password || !Name || !DNI || !Email) {
      console.error('❌ Campos vacíos');
      return res.status(400).json({ Error: 'Debe completar todos los campos.' });
    }

    
    const queryCheck = 'SELECT * FROM Usuarios WHERE User = ? OR DNI = ? OR Email = ?';
    db.get(queryCheck, [User, DNI, Email], async (error, existing) => {
      if (error) {
        console.error('❌ Error en la consulta:', error.message);
        return res.status(500).json({ Error: 'Error en la base de datos.' });
      }

      if (existing) {
        if (existing.User === User) {
          console.warn('⚠️ Usuario ya registrado');
          return res.status(400).json({ Error: 'El usuario ya está registrado.' });
        }
        if (existing.DNI === DNI) {
          console.warn('⚠️ DNI ya registrado');
          return res.status(400).json({ Error: 'El DNI ya está registrado.' });
        }
        if (existing.Email === Email) {
          console.warn('⚠️ Email ya registrado');
          return res.status(400).json({ Error: 'El correo electrónico ya está registrado.' });
        }
      }

      // 🔐 Encriptar contraseña
      const hash = await PasswordEncriptar(Password);
      if (!hash) {
        console.error('❌ Error al encriptar contraseña');
        return res.status(500).json({ Error: 'No se pudo encriptar la contraseña.' });
      }

      
      const insert = `INSERT INTO Usuarios (DNI, User, Password, Name, Email) VALUES (?, ?, ?, ?, ?)`;
      db.run(insert, [DNI, User, hash, Name, Email], function (err) {
        if (err) {
          console.error('❌ Error al registrar usuario:', err.message);
          return res.status(500).json({ Error: 'Error al registrar usuario.' });
        }

        console.log(`✅ Usuario ${User} registrado correctamente`);
        res.status(201).json({
          mensaje: 'Usuario registrado correctamente ✅',
          ID: this.lastID,
          User,
        });
      });
    });
  } catch (error) {
    console.error('❌ Error general:', error);
    res.status(500).json({ Error: 'Error en el servidor.' });
  }
};

module.exports = { LoginRegister };
