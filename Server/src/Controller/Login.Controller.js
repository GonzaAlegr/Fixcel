const SQLite = require('sqlite3')
const path = require('path')
const bcrypt = require('bcryptjs')
const { enviarCorreo } = require('../Utils/Email');
const nodemailer = require('nodemailer')
require('dotenv').config()

const { GenerarToken, VerificarToken } = require('../Utils/token')

const db = new SQLite.Database(
    path.resolve(__dirname, '../Database/db.db'),
    SQLite.OPEN_READWRITE,
    (err) => {
        if (err) console.log('❌ Error al conectar DB:', err)
    }
)

const LoginRegister = async (req, res) => {
    const { DNI, User, Password, Name, Email } = req.body;

    if (!DNI || !User || !Password || !Name || !Email) {
        return res.status(400).json({ exito: false, mensaje: 'Faltan datos.' });
    }

    const hashedPass = bcrypt.hashSync(Password, 10);
    const token = GenerarToken(Email);

    const sql = `
        INSERT INTO Usuarios (DNI, User, Password, Name, Email, EmailVerificado, TokenVerificacion)
        VALUES (?, ?, ?, ?, ?, 0, ?)
    `;

    db.run(sql, [DNI, User, hashedPass, Name, Email, token], async (err) => {
        if (err) {
            return res.status(400).json({ exito: false, mensaje: 'Error al registrar usuario.' });
        }

        const link = `http://localhost:3000/server/verificar/${token}`;
        const asunto = "Verifica tu cuenta en Fixcel";
        const cuerpo = `
            ¡Hola ${Name}!<br><br>
            Gracias por registrarte en Fixcel.<br>
            Haz clic en el siguiente botón para verificar tu cuenta y poder iniciar sesión:<br><br>
            <a href="${link}" style="
                display:inline-block;
                padding:10px 20px;
                background:#4CAF50;
                color:white;
                border-radius:6px;
                text-decoration:none;
            ">Verificar cuenta</a><br><br>
            Si no solicitaste esta cuenta, simplemente ignora este correo.
        `;

        await enviarCorreo(Email, asunto, cuerpo);

        res.json({ exito: true, mensaje: 'Usuario registrado. Revisa tu correo para verificar.' });
    });
};

const LoginUser = (req, res) => {
    const { User, Password } = req.body

    if (!User || !Password) {
        return res.status(400).json({ exito: false, mensaje: 'Faltan datos.' })
    }

    const sql = `SELECT * FROM Usuarios WHERE User = ?`

    db.get(sql, [User], (err, row) => {
        if (err) return res.status(500).json({ exito: false, mensaje: 'Error en el servidor.' })

        if (!row) return res.status(400).json({ exito: false, mensaje: 'Usuario no existe.' })

        const validPass = bcrypt.compareSync(Password, row.Password)
        if (!validPass) return res.status(400).json({ exito: false, mensaje: 'Contraseña incorrecta.' })

        if (Number(row.EmailVerificado) !== 1) {
            return res.status(401).json({
                exito: false,
                mensaje: 'Debes verificar tu correo antes de iniciar sesión.'
            })
        }

        const token = GenerarToken(row.Email)

        const usuario = {
            user: row.User,
            nombre: row.Name,
            email: row.Email
        }

        return res.json({
            exito: true,
            mensaje: 'Login exitoso',
            token,
            usuario
        })
    })
}

const VerificarCuenta = (req, res) => {
    const { token } = req.params

    let decoded
    try {
        decoded = VerificarToken(token)
    } catch (error) {
        return res.send('Token inválido o expirado.')
    }

    const sql = `
        UPDATE Usuarios
        SET EmailVerificado = 1
        WHERE Email = ?
    `

    db.run(sql, [decoded.Email], (error) => {
        if (error) return res.send('Error al verificar cuenta.')

        res.send(`
            <h1>Cuenta verificada con éxito</h1>
            <a 
                href="http://localhost:5173/inicio"
                style="padding: 10px 15px; background: #4CAF50; color:white; border-radius: 5px; text-decoration:none;">
                Iniciar Sesión
            </a>
        `)
    })
}



module.exports = {
    LoginRegister,
    LoginUser,
    VerificarCuenta
}