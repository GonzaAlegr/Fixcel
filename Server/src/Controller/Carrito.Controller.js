const db = require('../DataBase/db');

// 🛒 Agregar producto al carrito
const AgregarAlCarrito = (req, res) => {
    const { user, productoID, cantidad } = req.body;

    if (!user || !productoID) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    db.get(`SELECT * FROM Carrito WHERE User = ? AND ProductoID = ?`, [user, productoID], (err, fila) => {
        if (err) {
            console.error('Error al buscar producto en carrito ❌', err);
            return res.status(500).json({ error: 'Error al buscar producto' });
        }

        if (fila) {
            db.run(
                `UPDATE Carrito SET Cantidad = Cantidad + ? WHERE User = ? AND ProductoID = ?`,
                [cantidad || 1, user, productoID],
                (err) => {
                    if (err) {
                        console.error('Error al actualizar cantidad ❌', err);
                        return res.status(500).json({ error: 'Error al actualizar cantidad' });
                    }
                    res.json({ mensaje: 'Cantidad actualizada en el carrito ✅' });
                }
            );
        } else {
            db.run(
                `INSERT INTO Carrito (User, ProductoID, Cantidad) VALUES (?, ?, ?)`,
                [user, productoID, cantidad || 1],
                (err) => {
                    if (err) {
                        console.error('Error al agregar producto ❌', err);
                        return res.status(500).json({ error: 'Error al agregar producto' });
                    }
                    res.json({ mensaje: 'Producto agregado al carrito ✅' });
                }
            );
        }
    });
};

// 🧾 Obtener el carrito de un usuario
const ObtenerCarrito = (req, res) => {
    const { user } = req.params;

    db.all(
        `
        SELECT C.ID, C.Cantidad, P.Model, P.Price, P.Imagen
        FROM Carrito C
        JOIN Productos P ON C.ProductoID = P.ID
        WHERE C.User = ?
        `,
        [user],
        (err, filas) => {
            if (err) {
                console.error('Error al obtener carrito ❌', err);
                return res.status(500).json({ error: 'Error al obtener carrito' });
            }
            res.json(filas);
        }
    );
};

// ❌ Eliminar producto del carrito
const EliminarDelCarrito = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM Carrito WHERE ID = ?`, [id], (err) => {
        if (err) {
            console.error('Error al eliminar producto del carrito ❌', err);
            return res.status(500).json({ error: 'Error al eliminar producto' });
        }
        res.json({ mensaje: 'Producto eliminado del carrito ✅' });
    });
};

module.exports = { AgregarAlCarrito, ObtenerCarrito, EliminarDelCarrito };