import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../Layouts.css'

function Iniciose() {
  const [User, setUser] = useState('')
  const [Password, setPassword] = useState('')
  const navigate = useNavigate()

  const IniciarSubmit = async (e) => {
    e.preventDefault()

    if (!User || !Password) {
      return Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor completa todos los campos.',
        confirmButtonColor: '#d33',
      })
    }

    try {
      const ServidorBack = await axios.post(
        'http://localhost:3000/server/IniciarSesion',
        { User, Password },
        { withCredentials: true } 
      )

      if (ServidorBack.data.exito) {
        localStorage.setItem('usuario', JSON.stringify(ServidorBack.data.usuario))

        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: ServidorBack.data.mensaje || 'Bienvenido.',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          navigate('/main')
          window.location.reload()
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: ServidorBack.data.mensaje || 'Usuario o contraseña incorrectos.',
          confirmButtonColor: '#d33',
        })
      }
    } catch (error) {
      console.log(error)

      if (error.response && error.response.status === 401) {
        return Swal.fire({
          icon: 'warning',
          title: 'Cuenta no verificada',
          text: error.response.data.mensaje || 'Debes verificar tu correo para iniciar sesión.',
          confirmButtonColor: '#f39c12',
        })
      }

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
        <input type="text" value={User} onChange={(e) => setUser(e.target.value)} />

        <label>Contraseña</label>
        <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />

        <Link to="/registro">¿No tenés cuenta? Registrate</Link>
        <input className="btn-registrar" type="submit" value="Ingresar" />
      </form>
    </div>
  )
}

export default Iniciose