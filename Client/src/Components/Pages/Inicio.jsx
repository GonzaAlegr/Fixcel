import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import '../Layouts.css'

// 🔹 Importar imágenes
const imagenes = import.meta.glob('../Global/img/*', { eager: true })
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
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('') 
  const navigate = useNavigate()

  // caga de productos destacados
  useEffect(() => {
    axios.get('http://localhost:3000/api/productos/all')
      .then(res => setProductos(res.data.slice(0, 4)))
      .catch(err => console.error('Error al obtener productos destacados:', err))
  }, [])

  // carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const banners = [Banner1, Banner2, Banner3]

  const obtenerImagen = (nombre) => {
    const ruta = `../Global/img/${nombre}`
    return imagenes[ruta]?.default || imagenes['../Global/img/default.jpg']?.default
  }

  const suscribirse = async (e) => {
    e.preventDefault()

    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo inválido',
        text: 'Por favor ingresa un correo válido.',
      })
      return
    }

    try {
      const res = await axios.post('http://localhost:3000/newsletter/suscribir', { email })
      Swal.fire({
        icon: 'success',
        title: 'Suscripción exitosa',
        text: res.data.message || '¡Te has suscrito correctamente!',
        timer: 2000,
        showConfirmButton: false,
      })
      setEmail('')
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Email ya suscrito.',
      })
    }
  }

  return (
    <div className="inicio-container">
      <div className='cajalogo'>
        <h2 className="inicio-eslogan">
          Innovamos para reparar tu mundo
        </h2>
      </div>

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

      <section className="servicioss">
        <Link to="/servi" className='titulo'>Nuestros servicios</Link>
        <div className="grid-servicios">
          <div className="servicio-card"><Link to="/servi"><img src={Servicio1} alt="Reparacion" /></Link></div>
          <div className="servicio-card"><Link to="/servi"><img src={Servicio2} alt="Cambio" /></Link></div>
          <div className="servicio-card"><Link to="/servi"><img src={Servicio3} alt="Reemplazo" /></Link></div>
        </div>
      </section>

      <section className="productos-destacados">
        <Link to="/productos" className="titulo">Productos destacados</Link>
        <div className="grid-productos">
          {productos.map((p) => (
            <div className="card-producto" key={p.ID}>
              <Link to={`/producto/${p.ID}`} className="link-producto">
                <img src={obtenerImagen(p.Imagen)} alt={p.Model} className="img-producto" />
                <h3>{p.Brand} {p.Model}</h3>
              </Link>
              <p className="descripcion">{p.Description}</p>
              <p><b>Precio:</b> ${p.Price}</p>
              <div className="botones">
                <button className="btn-comprar" onClick={() => navigate(`/producto/${p.ID}`)}>Comprar ahora</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <h2 className="titulo">Suscríbete a nuestro Newsletter</h2>
        <form onSubmit={suscribirse} className="newsletter-form">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className='btn-verde'>Suscribirse</button>
        </form>
        {mensaje && <p className="mensaje-newsletter">{mensaje}</p>}
      </section>
    </div>
  )
}

export default Inicio