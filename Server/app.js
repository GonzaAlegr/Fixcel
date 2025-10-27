const Express = require('express')

const App= Express()

require('dotenv').config()

const PORT= process.env.PORT ||  5000

const LoginRouter=require('./src/Router/Login.Router')
const ProductosRouter = require('./src/Router/Productos.Router');
const ReparacionesRouter = require('./src/Router/Reparaciones.Router');

App.use('/api/login', LoginRouter);
App.use('/api/productos', ProductosRouter);
App.use('/api/reparaciones', ReparacionesRouter);
App.use(Express.json())



App.listen(PORT,()=>(
    console.log(` 🦖http://localhost:${PORT}`)
) )