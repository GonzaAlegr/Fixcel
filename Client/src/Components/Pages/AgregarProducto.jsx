import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../Layouts.css'

function AgregarProducto() {
  const [Brand, setBrand] = useState('')
  const [Model, setModel] = useState('')
  const [Description, setDescription] = useState('')
  const [Stock, setStock] = useState('')
  const [Price, setPrice] = useState('')
  const [Imagen, setImagen] = useState(null)

  const AgregarProductoSubmit = async (e) => {
    e.preventDefault()

    if (!Brand || !Model || !Description || !Stock || !Price || !Imagen) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de continuar.',
        confirmButtonColor: '#d33',
      })
      return
    }

    try {
      // 🔹 Solo tomamos el nombre del archivo
      const ImagenNombre = Imagen.name

      const productoData = {
        Brand,
        Model,
        Description,
        Stock,
        Price,
        Imagen: ImagenNombre,
      }

      const ServidorBack = await axios.post(
        'http://localhost:3000/server/RegistrarProducto',
        productoData
      )

      Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: ServidorBack.data.mensaje || 'El producto se guardó correctamente.',
        confirmButtonColor: '#3085d6',
      })

      // 🔹 Limpiar formulario
      setBrand('')
      setModel('')
      setDescription('')
      setStock('')
      setPrice('')
      setImagen(null)
    } catch (Error) {
      console.error(Error)
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: 'Hubo un problema al agregar el producto. Intenta de nuevo.',
        confirmButtonColor: '#d33',
      })
    }
  }

  return (
    <div className="registro-container">
      <h1 className="registro-titulo">Agregar Producto</h1>

      <form className="registro-form" onSubmit={AgregarProductoSubmit}>
        <label>Marca</label>
        <input type="text" value={Brand} onChange={(e) => setBrand(e.target.value)} />

        <label>Imagen</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
        />

        <label>Modelo</label>
        <input type="text" value={Model} onChange={(e) => setModel(e.target.value)} />

        <label>Descripción</label>
        <textarea value={Description} onChange={(e) => setDescription(e.target.value)} />

        <label>Stock</label>
        <input type="number" value={Stock} onChange={(e) => setStock(e.target.value)} />

        <label>Precio</label>
        <input type="number" value={Price} onChange={(e) => setPrice(e.target.value)} />

        <Link to="/productos">Ver productos</Link>
        <input className="btn-registrar" type="submit" value="Guardar producto" />
      </form>
    </div>
  )
}

export default AgregarProducto