const db = require('../DataBase/db');

const VerProductos = (req, res) => {
    const query = 'SELECT * FROM Productos';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener productos ❗', err);
            return res.status(500).json({ Error: 'Error en la base de datos' });
        }

        res.status(200).json(rows);
    });
};

const EliminarProducto = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ Error: 'Debe especificar el ID del producto' });
    }

    const query = 'DELETE FROM Productos WHERE ID = ?';
    db.run(query, [id], function (err) {
        if (err) {
            console.error('Error al eliminar producto ❗', err);
            return res.status(500).json({ Error: 'Error en la base de datos' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ Error: 'Producto no encontrado' });
        }

        res.status(200).json({ mensaje: 'Producto eliminado correctamente ✅' });
    });
};

const ModificarProducto = (req, res) => {
    const { id } = req.params;
    const { Brand, Model, Description, Stock, Price, Imagen } = req.body;

    if (!id || !Brand || !Model || !Description || !Stock || !Price) {
        return res.status(400).json({ Error: 'Debe completar todos los campos excepto Imagen (opcional)' });
    }

    const imagenFinal = Imagen || 'default.jpg';

    const query = `
        UPDATE Productos 
        SET Brand = ?, Model = ?, Description = ?, Stock = ?, Price = ?, Imagen = ?
        WHERE ID = ?
    `;

    db.run(query, [Brand, Model, Description, Stock, Price, imagenFinal, id], function (err) {
        if (err) {
            console.error('Error al modificar producto ❗', err);
            return res.status(500).json({ Error: 'Error en la base de datos' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ Error: 'Producto no encontrado' });
        }

        res.status(200).json({
            mensaje: 'Producto modificado correctamente ✅',
            ID: id,
            Brand,
            Model,
            Imagen: imagenFinal
        });
    });
};

const RegistrarProducto = (req, res) => {
    const { Brand, Model, Description, Stock, Price, Imagen } = req.body;

    if (!Brand || !Model || !Description || !Stock || !Price) {
        return res.status(400).json({ Error: 'Debe completar todos los campos excepto Imagen (opcional)' });
    }

    const imagenFinal = Imagen || 'default.jpg';

    const queryCheck = 'SELECT * FROM Productos WHERE Brand = ? AND Model = ?';
    db.get(queryCheck, [Brand, Model], (err, producto) => {
        if (err) {
            console.error('Error en la consulta ❗', err);
            return res.status(500).json({ Error: 'Error en la base de datos' });
        }

        if (producto) {
            return res.status(400).json({ Error: 'El producto ya está registrado' });
        }

        const queryInsert = `
            INSERT INTO Productos (Brand, Model, Description, Stock, Price, Imagen)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(queryInsert, [Brand, Model, Description, Stock, Price, imagenFinal], function (err) {
            if (err) {
                console.error('No se pudo registrar el producto ❗', err);
                return res.status(500).json({ Error: 'Error al registrar el producto' });
            }

            res.status(201).json({
                mensaje: 'Producto registrado correctamente ✅',
                ID: this.lastID,
                Brand,
                Model,
                Imagen: imagenFinal
            });
        });
    });
};

module.exports = {
    VerProductos,
    EliminarProducto,
    ModificarProducto,
    RegistrarProducto
};
