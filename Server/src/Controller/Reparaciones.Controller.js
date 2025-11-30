const db = require('../DataBase/db');

const RegistrarReparacion = (req, res) => {
    const { DNI, User, Model, Description } = req.body;

    if (!DNI || !User || !Model || !Description) {
        console.error('Campos vacíos ❗');
        return res.status(400).json({ Error: 'Debe completar todos los campos' });
    }

    const queryUsuario = 'SELECT * FROM Usuarios WHERE DNI = ? AND User = ?';
    db.get(queryUsuario, [DNI, User], (Error, Usuario) => {
        if (Error) {
            console.error('Error en la consulta de usuario ❗', Error);
            return res.status(500).json({ Error: 'Error en la base de datos' });
        }

        if (!Usuario) {
            console.error('El usuario no existe ❗');
            return res.status(404).json({ Error: 'El usuario no existe en la base de datos' });
        }

        const queryCheck = 'SELECT * FROM Reparaciones WHERE DNI = ? AND Model = ?';
        db.get(queryCheck, [DNI, Model], (Error, Reparacion) => {
            if (Error) {
                console.error('Error en la consulta de reparación ❗', Error);
                return res.status(500).json({ Error: 'Error en la base de datos' });
            }

            if (Reparacion) {
                console.error('Reparación duplicada ❗');
                return res.status(400).json({
                    Error: 'Ya existe una reparación registrada para este modelo'
                });
            }

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

const ObtenerReparaciones = (req, res) => {
    const query = 'SELECT * FROM Reparaciones';

    db.all(query, [], (Error, filas) => {
        if (Error) {
            console.error('❌ Error al obtener reparaciones:', Error);
            return res.status(500).json({
                Error: 'Error al obtener las reparaciones'
            });
        }

        res.status(200).json(filas);
    });
};


module.exports = {
    RegistrarReparacion,
    ObtenerReparaciones
};
