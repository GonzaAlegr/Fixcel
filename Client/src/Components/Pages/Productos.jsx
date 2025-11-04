import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../Layouts.css'

const imagenes = import.meta.glob('../Global/img/*', { eager: true })

function Productos() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/server/Productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al obtener productos:', err))
  }, [])

  const obtenerImagen = (nombre) => {
    const ruta = `../Global/img/${nombre}`
    if (imagenes[ruta]) {
      return imagenes[ruta].default
    } else {
      return imagenes['../Global/img/default.jpg'].default
    }
  }

  return (
    <div className="productos-container">
      <h2 className="titulo">Productos disponibles</h2>

      <div className="grid-productos">
        {productos.map((p) => (
          <Link to={`/producto/${p.ID}`} key={p.ID} className="card-producto">
            <img
              src={obtenerImagen(p.Imagen)}
              alt={p.Model}
              className="img-producto"
            />
            <h3>{p.Brand} {p.Model}</h3>
            <p className="descripcion">{p.Description}</p>
            <p><b>Stock:</b> {p.Stock}</p>
            <p><b>Precio:</b> ${p.Price}</p>
            <div className="botones">
              <button className="btn-verde">Añadir al carrito</button>
              <button className="btn-comprar">Comprar</button>
            </div>
          </Link>
        ))}
      </div>

      <Link to="/regipro" className="btn-registrar">Registrar nuevo producto</Link>
    </div>
  )
}

export default Productos