import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../Layouts.css'

function Reparacionver() {
  const [reparaciones, setReparaciones] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/reparacion/reparaciones')
      .then(res => {
        console.log('📌 Datos recibidos del backend:', JSON.stringify(res.data, null, 2))
        let data = res.data
        if (!Array.isArray(data)) {

          if (data.reparaciones && Array.isArray(data.reparaciones)) data = data.reparaciones
          else if (data.data && Array.isArray(data.data)) data = data.data
          else data = []
        }
        setReparaciones(data)
      })
      .catch((err) => {
        console.error('❌ Error al obtener reparaciones', err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron obtener las reparaciones 😞',
        })
      })
  }, [])

  const getCampo = (obj, ...keys) => {
    for (const k of keys) {
      if (obj[k] !== undefined && obj[k] !== null) return obj[k]
    }
    return ''
  }

  return (
    <div className="productos-container">
      <h2 className="titulo">Reparaciones registradas</h2>

      {reparaciones.length === 0 ? (
        <p>No hay reparaciones registradas.</p>
      ) : (
        <div className="grid-productos" style={{ gridTemplateColumns: '1fr' }}>
          {reparaciones.map((r) => {
            const id = getCampo(r, 'ID', 'id', 'Id')
            const dni = getCampo(r, 'Dni', 'DNI', 'dni')
            const user = getCampo(r, 'User', 'user', 'Usuario', 'usuario')
            const model = getCampo(r, 'Model', 'model')
            const desc = getCampo(r, 'Description', 'description', 'Descripcion', 'descripcion')

            return (
              <div key={id || `${dni}-${model}-${Math.random()}`} className="card-producto">
                <div className="enlace-producto" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{user} — {model}</h3>
                  <p><b>DNI:</b> {dni}</p>
                  <p className="descripcion">{desc}</p>
                </div>

                <div className="botones" style={{ marginTop: 10 }}>
                  <button
                    className="btn-comprar"
                    onClick={() => {
                      navigator.clipboard?.writeText(JSON.stringify(r))
                      Swal.fire({ icon: 'success', title: 'Copiado', text: 'Datos copiados al portapapeles' })
                    }}
                  >
                    Copiar datos
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Reparacionver
