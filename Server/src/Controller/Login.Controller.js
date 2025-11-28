const db = require('../Database/db');
const { PasswordEncriptar, CompararPassword } = require('../Utils/hash');
const { generarToken, verificarToken } = require('../Utils/Token');
const { enviarCorreo } = require('../Utils/Email');

console.log("✅ Login.Controller cargado correctamente");

// ============================================================
// REGISTRO — DEBUG COMPLETO
// ============================================================
const LoginRegister = async (req, res) => {
  try {
    console.log("📩 Datos recibidos en /RegistrarUsuario:", req.body);

    const { User, Password, Name, DNI, Email } = req.body;

    if (!User || !Password || !Name || !DNI || !Email) {
      console.log("⚠ Campos incompletos");
      return res.status(400).json({ Error: "Debe completar todos los campos." });
    }

    const queryCheck = "SELECT * FROM Usuarios WHERE User = ? OR DNI = ? OR Email = ?";
    console.log("🔍 Verificando si el usuario ya existe...");

    db.get(queryCheck, [User, DNI, Email], async (error, existing) => {
      if (error) {
        console.log("❌ Error SELECT:", error);
        return res.status(500).json({ Error: "Error en la base de datos." });
      }

      if (existing) {
        console.log("⚠ Usuario ya existe:", existing);
        if (existing.User === User) return res.status(400).json({ Error: "El usuario ya está registrado." });
        if (existing.DNI === DNI) return res.status(400).json({ Error: "El DNI ya está registrado." });
        if (existing.Email === Email) return res.status(400).json({ Error: "El correo electrónico ya está registrado." });
      }

      console.log("🔐 Encriptando contraseña...");
      const hash = await PasswordEncriptar(Password);

      console.log("🔑 Generando token...");
      const token = generarToken(Email);

      console.log("📥 Insertando usuario en la base...");

      const insertQuery = `
        INSERT INTO Usuarios 
        (DNI, User, Password, Name, Email, EmailVerificado, TokenVerificacion)
        VALUES (?, ?, ?, ?, ?, 0, ?)
      `;

      db.run(insertQuery, [DNI, User, hash, Name, Email, token], async function (err) {
        if (err) {
          console.log("❌ ERROR INSERT:", err);
          return res.status(500).json({ Error: "Error al registrar usuario." });
        }

        const url = `http://localhost:3000/server/verificar/${token}`;
        console.log("📨 Enviando correo a:", Email);

        try {
          await enviarCorreo(
            Email,
            "Verifica tu correo electrónico",
            `
              Hola ${Name},<br><br>
              Gracias por registrarte en Fixcell.<br>
              Haz clic aquí para activar tu cuenta:<br><br>
              <a href="${url}">Verificar cuenta</a>
            `
          );
        } catch (mailError) {
          console.log("❌ ERROR AL ENVIAR CORREO:", mailError);
          return res.status(500).json({ Error: "Usuario creado pero fallo el envío de correo." });
        }

        console.log("✅ Registro completado con éxito");
        res.status(201).json({ mensaje: "Registrado. Verifica tu correo." });
      });
    });

  } catch (err) {
    console.log("🔥 ERROR GENERAL:", err);
    res.status(500).json({ Error: "Error en el servidor." });
  }
};

// ============================================================
// LOGIN
// ============================================================
const LoginUser = (req, res) => {
  const { User, Password } = req.body;

  db.get("SELECT * FROM Usuarios WHERE User = ?", [User], async (err, row) => {
    if (err) return res.status(500).json({ mensaje: "Error en la base de datos." });
    if (!row) return res.json({ exito: false, mensaje: "Usuario no encontrado." });

    if (row.EmailVerificado === 0) {
      return res.json({
        exito: false,
        mensaje: "Debes verificar tu correo antes de iniciar sesión.",
      });
    }

    const passwordValida = await CompararPassword(Password, row.Password);
    if (!passwordValida) return res.json({ exito: false, mensaje: "Contraseña incorrecta." });

    res.json({
      exito: true,
      mensaje: `Bienvenido, ${row.Name}`,
      usuario: row,
    });
  });
};

// ============================================================
// VERIFICAR TOKEN
// ============================================================
const VerificarCuenta = (req, res) => {
  const { token } = req.params;

  try {
    const decoded = verificarToken(token);

    db.run(
      `UPDATE Usuarios 
       SET EmailVerificado = 1, TokenVerificacion = NULL
       WHERE Email = ?`,
      [decoded.email],
      (err) => {
        if (err) return res.status(500).send("Error al verificar cuenta.");
        res.send("Cuenta verificada correctamente ✔");
      }
    );
  } catch (err) {
    return res.status(400).send("Token inválido o expirado ❌");
  }
};

module.exports = { LoginRegister, LoginUser, VerificarCuenta };