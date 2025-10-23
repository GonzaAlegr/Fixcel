const db = require('../DataBase/db');

// Registrar reparación
const RegistrarReparacion = (req, res) => {
    const { DNI, User, Model, Description } = req.body;

    // Verificar campos vacíos
    if (!DNI || !User || !Model || !Description) {
        console.error('Campos vacíos ❗');
        return res.status(400).json({ Error: 'Debe completar todos los campos' });
    }

    // Verificar que el usuario exista en la tabla Usuarios
    const queryUsuario = 'SELECT * FROM Usuarios WHERE Dni = ? AND User = ?';
    db.get(queryUsuario, [DNI, User], (Error, Usuario) => {
        if (Error) {
            console.error('Error en la consulta de usuario ❗', Error);
            return res.status(500).json({ Error: 'Error en la base de datos' });
        }

        if (!Usuario) {
            console.error('El usuario no existe ❗');
            return res.status(404).json({ Error: 'El usuario no existe en la base de datos' });
        }

        // Verificar si ya hay una reparación con el mismo modelo y usuario (opcional)
        const queryCheck = 'SELECT * FROM Reparaciones WHERE Dni = ? AND Model = ?';
        db.get(queryCheck, [DNI, Model], (Error, Reparacion) => {
            if (Error) {
                console.error('Error en la consulta de reparación ❗', Error);
                return res.status(500).json({ Error: 'Error en la base de datos' });
            }

            if (Reparacion) {
                console.error('Reparación duplicada ❗');
                return res.status(400).json({ Error: 'Ya existe una reparación registrada para este modelo' });
            }

            // Insertar nueva reparación
            const queryInsert = `
                INSERT INTO Reparaciones (DNI, User, Model, Description)
                VALUES (?, ?, ?, ?)
            `;
            db.run(queryInsert, [DNI, User, Model, Description], function (Error) {
                if (Error) {
                    console.error('No se pudo registrar la reparación ❗', Error);
                    return res.status(500).json({ Error: 'Error al registrar la reparación' });
                }

                res.status(201).json({
                    mensaje: 'Reparación registrada correctamente ✅',
                    ID: this.lastID,
                    DNI,
                    User,
                    Model
                });
            });
        });
    });
};

module.exports = { RegistrarReparacion };
