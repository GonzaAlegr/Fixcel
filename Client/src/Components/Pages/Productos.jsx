import { useEffect, useState } from 'react'
import axios from 'axios'
import '../Layouts.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function Productos() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/server/Productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al obtener productos:', err))
  }, [])

  return (
    <div className="productos-container">
      <h2 className="titulo">Productos disponibles</h2>
      <div className="grid-productos">
        {productos.map((p) => (
          <div className="card-producto" key={p.ID}>
            <img src={`../Global/img/${p.Imagen}`} alt={p.Imagen} className="img-producto" />
            <h3>{p.Brand} {p.Model}</h3>
            <p className="descripcion">{p.Description}</p>
            <p><b>Stock:</b> {p.Stock}</p>
            <p><b>Precio:</b> ${p.Price}</p>
            <button className="btn-comprar">Comprar</button>
          </div>
        ))}
        <Link to="/regipro">Registrar Producto</Link>
      </div>
      
    </div>
  )
}

export default Productos
