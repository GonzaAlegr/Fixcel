import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import '../Layouts.css'

// 🔹 Importa todas las imágenes de forma segura
const imagenes = import.meta.glob('../Global/img/*', { eager: true })

function ProductoDetalle() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [recomendados, setRecomendados] = useState([])

  useEffect(() => {
    // Cargar producto seleccionado
    axios.get(`http://localhost:3000/server/Productos/${id}`)
      .then(res => setProducto(res.data))
      .catch(err => console.error('Error al cargar producto:', err))

    // Cargar productos recomendados
    axios.get('http://localhost:3000/server/Productos')
      .then(res => {
        const productosFiltrados = res.data.filter(p => p.ID !== parseInt(id))
        const seleccion = productosFiltrados.sort(() => 0.5 - Math.random()).slice(0, 4)
        setRecomendados(seleccion)
      })
      .catch(err => console.error('Error al cargar recomendados:', err))
  }, [id])

  // 🔹 Función para obtener imagen o usar una por defecto
  const obtenerImagen = (nombre) => {
    const ruta = `../Global/img/${nombre}`
    if (imagenes[ruta]) {
      return imagenes[ruta].default
    } else {
      return imagenes['../Global/img/default.jpg']?.default
    }
  }

  if (!producto) return <p className="cargando">Cargando producto...</p>

  return (
    <div className="producto-detalle">
      <div className="detalle-principal">
        <div className="detalle-imagen">
          <img
            src={obtenerImagen(producto.Imagen)}
            alt={producto.Model}
            className="img-producto"
          />
        </div>

        <div className="detalle-info">
          <h2 className="titulo-producto">{producto.Brand} {producto.Model}</h2>
          <p className="descripcion">{producto.Description}</p>
          <p className="precio"><b>Precio:</b> ${producto.Price}</p>

          <div className="botones">
            <button className="btn-verde">Añadir al carrito</button>
            <button className="btn-comprar">Comprar ahora</button>
          </div>
        </div>
      </div>

      <section className="recomendados">
        <h3 className="titulo-recomendados">Productos recomendados</h3>
        <div className="lista-recomendados">
          {recomendados.map(r => (
            <Link to={`/producto/${r.ID}`} key={r.ID} className="card-recomendado">
              <img
                src={obtenerImagen(r.Imagen)}
                alt={r.Model}
                className="img-producto"
              />
              <h4>{r.Brand} {r.Model}</h4>
              <p>${r.Price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductoDetalle