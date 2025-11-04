const db = require('../DataBase/db')
const { PasswordEncriptar, CompararPassword } = require('../Utils/hash')
// Registro
const LoginRegister = async (req, res) => {
  try {
    const { User, Password, Name, DNI, Email } = req.body
    if (!User || !Password || !Name || !DNI || !Email) {
      return res.status(400).json({ Error: 'Debe completar todos los campos.' })
    }

    const queryCheck = 'SELECT * FROM Usuarios WHERE User = ? OR DNI = ? OR Email = ?'
    db.get(queryCheck, [User, DNI, Email], async (error, existing) => {
      if (error) return res.status(500).json({ Error: 'Error en la base de datos.' })
      if (existing) {
        if (existing.User === User)
          return res.status(400).json({ Error: 'El usuario ya está registrado.' })
        if (existing.DNI === DNI)
          return res.status(400).json({ Error: 'El DNI ya está registrado.' })
        if (existing.Email === Email)
          return res.status(400).json({ Error: 'El correo electrónico ya está registrado.' })
      }

      const hash = await PasswordEncriptar(Password)
      db.run(
        `INSERT INTO Usuarios (DNI, User, Password, Name, Email) VALUES (?, ?, ?, ?, ?)`,
        [DNI, User, hash, Name, Email],
        function (err) {
          if (err) return res.status(500).json({ Error: 'Error al registrar usuario.' })
          res.status(201).json({
            mensaje: 'Usuario registrado correctamente ✅',
            ID: this.lastID,
            User,
          })
        }
      )
    })
  } catch {
    res.status(500).json({ Error: 'Error en el servidor.' })
  }
}

// Login
const LoginUser = (req, res) => {
  const { User, Password } = req.body
  db.get('SELECT * FROM Usuarios WHERE User = ?', [User], async (err, row) => {
    if (err) return res.status(500).json({ mensaje: 'Error en la base de datos.' })
    if (!row) return res.json({ exito: false, mensaje: 'Usuario no encontrado.' })

    const passwordValida = await CompararPassword(Password, row.Password);
    if (!passwordValida) {
      return res.json({ exito: false, mensaje: 'Contraseña incorrecta.' })
    }

    res.json({
      exito: true,
      mensaje: `Bienvenido, ${row.Name}`,
      usuario: { id: row.ID, nombre: row.Name, user: row.User, email: row.Email },
    })
  })
}

module.exports = { LoginRegister, LoginUser }