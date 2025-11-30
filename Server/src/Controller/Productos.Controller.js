const db = require('../DataBase/db');

const RegistrarProducto = (req, res) => {
    const { Brand, Model, Description, Stock, Price, Imagen } = req.body;

    if (!Brand || !Model || !Description || !Stock || !Price || !Imagen) {
        console.error('Campos vacíos ❗');
        return res.status(400).json({ Error: 'Debe completar todos los campos' });
    }

    const queryCheck = 'SELECT * FROM Productos WHERE Brand = ? AND Model = ?';
    db.get(queryCheck, [Brand, Model], (Error, Producto) => {
        if (Error) {
            console.error('Error en la consulta ❗', Error);
            return res.status(500).json({ Error: 'Error en la base de datos' });
        }

        if (Producto) {
            console.error('Producto existente ❗');
            return res.status(400).json({ Error: 'El producto ya está registrado' });
        }

        const queryInsert = `
            INSERT INTO Productos (Brand, Model, Description, Stock, Price, Imagen)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(queryInsert, [Brand, Model, Description, Stock, Price, Imagen], function (Error) {
            if (Error) {
                console.error('No se pudo registrar el producto ❗', Error);
                return res.status(500).json({ Error: 'Error al registrar el producto' });
            }

            res.status(201).json({
                mensaje: 'Producto registrado correctamente ✅',
                ID: this.lastID,
                Brand,
                Model,
                Imagen
            });
        });
    });
};

module.exports = { RegistrarProducto };
