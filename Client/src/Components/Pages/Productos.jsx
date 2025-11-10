import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../Layouts.css'

const imagenes = import.meta.glob('../Global/img/*', { eager: true })

function Productos() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/server/Productos')
      .then(res => setProductos(res.data))
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron obtener los productos 😞',
        })
      })
  }, [])

  const obtenerImagen = (nombre) => {
    const ruta = `../Global/img/${nombre}`
    if (imagenes[ruta]) {
      return imagenes[ruta].default
    } else {
      return imagenes['../Global/img/default.jpg'].default
    }
  }

  // 🛒 Agregar al carrito con SweetAlert
  const agregarAlCarrito = async (productoID, e) => {
    e.preventDefault()
    const usuario = JSON.parse(localStorage.getItem('usuario'))

    if (!usuario) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para agregar productos al carrito 🧑‍💻',
        confirmButtonColor: '#1e3a8a',
      })
      return
    }

    try {
      const res = await axios.post('http://localhost:3000/server/AgregarAlCarrito', {
        user: usuario.user,
        productoID,
        cantidad: 1
      })

      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: res.data.mensaje || 'El producto se agregó correctamente al carrito 🛒',
        showConfirmButton: false,
        timer: 1800
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: '❌ Hubo un problema al agregar el producto al carrito.',
      })
    }
  }

  return (
    <div className="productos-container">
      <h2 className="titulo">Productos disponibles</h2>

      <div className="grid-productos">
        {productos.map((p) => (
          <div key={p.ID} className="card-producto">
            <Link to={`/producto/${p.ID}`} className="enlace-producto">
              <img
                src={obtenerImagen(p.Imagen)}
                alt={p.Model}
                className="img-producto"
              />
              <h3>{p.Brand} {p.Model}</h3>
              <p className="descripcion">{p.Description}</p>
              <p>Stock:{p.Stock}</p>
              <p><b>Precio:</b> ${p.Price}</p>
            </Link>

            <div className="botones">
              <button
                className="btn-verde"
                onClick={(e) => agregarAlCarrito(p.ID, e)}
              >
                Añadir al carrito
              </button>

              <button className="btn-comprar">Comprar</button>
            </div>
          </div>
        ))}
      </div>

      <Link to="/regipro" className="btn-registrar">Registrar nuevo producto</Link>
    </div>
  )
}

export default Productos