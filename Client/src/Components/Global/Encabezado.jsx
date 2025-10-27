import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import '../Layouts.css'
import { AiFillStar } from "react-icons/ai"
import Letra from './img/fixcel.png'
import Eng from './img/fixx.png'
import Registrar from '../Pages/Registrar.jsx'

function Encabezado() {
  return (
    <Router>
      <title>Fixcel</title>
      <header>
        <div className="logo-container">
          <img src={Eng} alt="Fixcel logo" className="eng" />
          <img src={Letra} alt="Fixcel name" className="letra" />
        </div>

        <nav className="menu">
          {/* ✅ Enlaces de navegación */}
          <Link to="/Login">Login</Link>
          <a href="#">Productos</a>
          <a href="#">Servicios</a>
        </nav>
      </header>

      {/* ✅ Rutas definidas dentro del encabezado */}
      <Routes>
        <Route path="/login" element={<Registrar />} />
      </Routes>
    </Router>
  )
}

export default Encabezado