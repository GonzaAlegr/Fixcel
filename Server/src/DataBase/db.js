// variable = dependencia (libreria)
const SQLite = require('sqlite3');
//para ubi. elementos
const path = require('path');

//ubi + name de la bd
const db_Ubicacion = path.resolve(__dirname, 'db.db');

//creamos db junto a las tablas
const db = new SQLite.Database(db_Ubicacion, (Error) => {
    //si hay error que lo indique
    if (Error) {
        console.error('No se Pudo crear la BD ❗');
    } else {
        console.log('La BD se creo Correctamente ✅');

        // Tabla Usuarios
        db.run(`
           CREATE TABLE IF NOT EXISTS Usuarios(
           DNI TEXT PRIMARY KEY,
           User TEXT UNIQUE,
           Password TEXT,
           Name TEXT,
           Email TEXT UNIQUE 
            )`, (Error) => {
            if (Error) {
                console.log('No se pudo crear la Tabla USUARIOS ❗');
            } else {
                console.log('Se creo la Tabla USUARIOS ✅');
            }
        });

        // Tabla Productos
        db.run(`
            CREATE TABLE IF NOT EXISTS Productos(
             ID INTEGER PRIMARY KEY AUTOINCREMENT,
             Brand TEXT,
             Model TEXT,
             Description TEXT,
             Stock INTEGER,
             Price INTEGER,
             Imagen TEXT
            )`, (Error) => {
            if (Error) {
                console.log('No se pudo crear la Tabla PRODUCTOS ❗');
            } else {
                console.log('Se creo la Tabla PRODUCTOS ✅');
            }
        });

        // Tabla Carrito
        db.run(`
        CREATE TABLE IF NOT EXISTS Carrito (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            User TEXT,
            ProductoID INTEGER,
            Cantidad INTEGER DEFAULT 1,
            FOREIGN KEY (ProductoID) REFERENCES Productos(ID)
            )`, (Error) => {
            if (Error) {
                console.error('No se pudo crear la Tabla Carrito ❗');
            } else {
                console.log('Se pudo crear la tabla Carrito ✅');
            }
        });

        // Tabla Reparaciones
        db.run(`
            CREATE TABLE IF NOT EXISTS Reparaciones(
             ID INTEGER PRIMARY KEY AUTOINCREMENT,
             Dni TEXT ,
             User TEXT,
             Model TEXT,
             Description TEXT,
             FOREIGN KEY (Dni) REFERENCES Usuarios(Dni),
             FOREIGN KEY (User) REFERENCES Usuarios(User)
            )`, (Error) => {
            if (Error) {
                console.log('No se pudo crear la Tabla REPARACIONES ❗');
            } else {
                console.log('Se creo la Tabla REPARACIONES ✅');
            }
        });

        // Tabla Email
        db.run(`
            CREATE TABLE IF NOT EXISTS Email(
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                Email TEXT,
                Asunto TEXT,              
                Cuerpo TEXT
                )`, (Error) => {
            if (Error) {
                console.error('No se pudo crear la Tabla EMAIL ❗');
            } else {
                console.log('Se pudo crear la tabla EMAIL ✅');
            }
        });

        // 🆕 Tabla Newsletter
        db.run(`
            CREATE TABLE IF NOT EXISTS Newsletter (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                Email TEXT UNIQUE
            )`, (Error) => {
            if (Error) {
                console.error('No se pudo crear la Tabla NEWSLETTER ❗');
            } else {
                console.log('Se creo la Tabla NEWSLETTER ✅');
            }
        });
    }
});

module.exports = db;