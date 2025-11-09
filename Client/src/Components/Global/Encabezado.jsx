import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import '../Layouts.css'
import Letra from './img/fixcel.png'
import Eng from './img/fixx.png'
import Registrar from '../Pages/Registrar.jsx'
import Iniciose from '../Pages/iniciose.jsx'
import Servicios from '../Pages/Servicios.jsx'
import Productos from '../Pages/Productos.jsx'
import Inicio from '../Pages/Inicio.jsx'
import AgregarProducto from '../Pages/AgregarProducto.jsx'
import ProductoDetalle from '../Pages/ProductoDetalle.jsx'
import Carrito from '../Pages/Carrito.jsx'

function Encabezado() {
  const [usuario, setUsuario] = useState(null)
  const [mostrarCuenta, setMostrarCuenta] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('usuario')
    if (user) setUsuario(JSON.parse(user))
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    setUsuario(null)
    setMostrarCuenta(false)
    window.location.href = '/main'
  }

  // Cierra el panel al hacer clic fuera
  useEffect(() => {
    const cerrarAlClickFuera = (e) => {
      const panel = document.querySelector('.panel-cuenta')
      if (panel && !panel.contains(e.target) && !e.target.classList.contains('btn-cuenta')) {
        setMostrarCuenta(false)
      }
    }
    document.addEventListener('click', cerrarAlClickFuera)
    return () => document.removeEventListener('click', cerrarAlClickFuera)
  }, [])

  return (
    <Router>
      <title>Fixcel</title>

      <header>
        <div className="logo-container">
          <Link to="/main"><img src={Eng} alt="Fixcel logo" className="eng" /></Link>
          <img src={Letra} alt="Fixcel name" className="letra" />
        </div>

        <nav className="menu">
          <Link to="/main">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/servi">Servicios</Link>

          {!usuario ? (
            <>
              <Link to="/inicio">Iniciar sesión</Link>
            </>
          ) : (
            <>
              <button
                className="btn-cuenta"
                onClick={() => setMostrarCuenta(!mostrarCuenta)}
              >
                Tu cuenta
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Panel lateral */}
      {mostrarCuenta && (
        <div className="panel-cuenta">
          <div className="panel-header">
            <h2>Tu cuenta</h2>
            <button className="cerrar-panel" onClick={() => setMostrarCuenta(false)}>×</button>
          </div>
          <div className="panel-body">
            <p><strong>Usuario:</strong> {usuario?.user}</p>
            <p><strong>Nombre:</strong> {usuario?.nombre}</p>
            <p><strong>Email:</strong> {usuario?.email}</p>
            <Link to="/carrito">
              <button className="btn-ver-carrito">Ver carrito 🛒</button>
            </Link>

            <button onClick={cerrarSesion} className="btn-logout">Cerrar sesión</button>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/main" element={<Inicio />} />
        <Route path="/registro" element={<Registrar />} />
        <Route path="/inicio" element={<Iniciose />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/servi" element={<Servicios />} />
        <Route path="/regipro" element={<AgregarProducto />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </Router>
  )
}

export default Encabezado
