import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../Layouts.css'

function iniciose() {
  const [User, setUser] = useState('')
  const [Password, setPassword] = useState('')
  const navigate = useNavigate()

  const IniciarSubmit = async (e) => {
    e.preventDefault()

    if (!User || !Password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor completa todos los campos.',
        confirmButtonColor: '#d33',
      })
      return
    }

    try {
      const ServidorBack = await axios.post('http://localhost:3000/server/IniciarSesion', {
        User,
        Password
      })

      if (ServidorBack.data.exito) {
        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: ServidorBack.data.mensaje || 'Bienvenido.',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          navigate('/iniciose') // redirige al componente de inicio (Iniciose)
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: ServidorBack.data.mensaje || 'Usuario o contraseña incorrectos.',
          confirmButtonColor: '#d33',
        })
      }

    } catch (Error) {
      console.log(Error)
      Swal.fire({
        icon: 'error',
        title: 'Error en el servidor',
        text: 'Hubo un problema al iniciar sesión. Intenta de nuevo.',
        confirmButtonColor: '#d33',
      })
    }
  }

  return (
    <div className="registro-container">
      <h1 className="registro-titulo">Iniciar Sesión</h1>

      <form className="registro-form" onSubmit={IniciarSubmit}>
        <label>Usuario</label>
        <input
          type="text"
          value={User}
          onChange={(e) => setUser(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/registro">¿No tenés cuenta? Registrate</Link>
        <input className="btn-registrar" type="submit" value="Ingresar" />
      </form>
    </div>
  )
}

export default iniciose
