import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../Layouts.css'

// 🔹 Importar todas las imágenes dinámicamente (incluye productos)
const imagenes = import.meta.glob('../Global/img/*', { eager: true })

// 🔹 Imágenes fijas
import Eng from '../Global/img/fixx.png'
import Logo from '../Global/img/fixcellogo.png'
import Banner1 from '../Global/img/10.jpg'
import Banner2 from '../Global/img/9.jpg'
import Banner3 from '../Global/img/8.jpg'
import Servicio1 from '../Global/img/servicio1.jpg'
import Servicio2 from '../Global/img/servicio2.jpg'
import Servicio3 from '../Global/img/servicio3.jpg'

function Inicio() {
  const [productos, setProductos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  // 🔹 Cargar productos desde la base de datos
  useEffect(() => {
    axios.get('http://localhost:3000/server/Productos')
      .then(res => setProductos(res.data.slice(0, 4))) // solo 4 destacados
      .catch(err => console.error('Error al obtener productos destacados:', err))
  }, [])

  // 🔹 Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // 🔹 Banners
  const banners = [Banner1, Banner2, Banner3]

  // 🔹 Función para obtener imagen o usar una por defecto
  const obtenerImagen = (nombre) => {
    const ruta = `../Global/img/${nombre}`
    if (imagenes[ruta]) {
      return imagenes[ruta].default
    } else {
      return imagenes['../Global/img/default.jpg']?.default
    }
  }

  return (
    <div className="inicio-container">
      {/* 🔹 Eslogan */}
      <div className='cajalogo'>
        <h2 className="inicio-eslogan">
          Innovamos para reparar tu mundo
        </h2>
      </div>

      {/* 🔹 Carrusel */}
      <div className="carousel">
        {banners.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`banner-${index}`}
            className={`carousel-img ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* 🔹 Servicios */}
      <section className="servicioss">
        <Link to="/servi" className='titulo'>Nuestros servicios</Link>
        <div className="grid-servicios">
          <div className="servicio-card">
            <Link to="/servi"><img src={Servicio1} alt="Reparacion" /></Link>
          </div>
          <div className="servicio-card">
            <Link to="/servi"><img src={Servicio2} alt="Cambio" /></Link>
          </div>
          <div className="servicio-card">
            <Link to="/servi"><img src={Servicio3} alt="Reemplazo" /></Link>
          </div>
        </div>
      </section>

      {/* 🔹 Productos destacados */}
      <section className="productos-destacados">
        <Link to="/productos" className="titulo">Productos destacados</Link>
        <div className="grid-productos">
          {productos.map((p) => (
            <div className="card-producto" key={p.ID}>
              <Link to={`/producto/${p.ID}`} className="link-producto">
                <img
                  src={obtenerImagen(p.Imagen)}
                  alt={p.Model}
                  className="img-producto"
                />
                <h3>{p.Brand} {p.Model}</h3>
              </Link>
              <p className="descripcion">{p.Description}</p>
              <p><b>Precio:</b> ${p.Price}</p>
              <div className="botones">
                <button className="btn-comprar" onClick={() => navigate(`/producto/${p.ID}`)}>
                  Comprar ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Inicio