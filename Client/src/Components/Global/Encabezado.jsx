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

function Encabezado() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('usuario')
    if (user) setUsuario(JSON.parse(user))
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    setUsuario(null)
    window.location.href = '/main'
  }

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
              <Link to="/cuenta" className="cuenta-link">
                Tu cuenta
              </Link>
              <button onClick={cerrarSesion} className="btn-logout">Cerrar sesión</button>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/main" element={<Inicio />} />
        <Route path="/registro" element={<Registrar />} />
        <Route path="/inicio" element={<Iniciose />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/servi" element={<Servicios />} />
        <Route path="/regipro" element={<AgregarProducto />} />
      </Routes>
    </Router>
  )
}

export default Encabezado