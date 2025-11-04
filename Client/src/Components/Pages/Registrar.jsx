import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../Layouts.css'

function Registrar() {
  const [User, setUser] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [Name, setName] = useState('')
  const [DNI, setDNI] = useState('')
  const [Email, setEmail] = useState('')
  const navigate = useNavigate()

  const RegistrarSubmit = async (e) => {
    e.preventDefault()

    if (Password !== ConfirmPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Por favor verifica las contraseñas antes de continuar.',
        confirmButtonColor: '#d33',
      })
    }

    try {
      const ServidorBack = await axios.post('http://localhost:3000/server/RegistrarUsuario', {
        User,
        Password,
        Name,
        DNI,
        Email,
      })

      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: ServidorBack.data.mensaje || 'Usuario creado correctamente.',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigate('/inicio') // redirige a inicio de sesión
      })

      setUser('')
      setPassword('')
      setConfirmPassword('')
      setName('')
      setDNI('')
      setEmail('')
    } catch (error) {
      const mensaje =
        error.response?.data?.Error ||
        'Hubo un problema al registrar. Intenta de nuevo.'
      if (mensaje.includes('ya está registrado')) {
        Swal.fire({
          icon: 'warning',
          title: 'Usuario existente',
          text: mensaje + ' Redirigiendo al inicio de sesión...',
          confirmButtonColor: '#3085d6',
        }).then(() => navigate('/inicio'))
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: mensaje,
          confirmButtonColor: '#d33',
        })
      }
    }
  }

  return (
    <div className="registro-container">
      <h1 className="registro-titulo">Registro</h1>

      <form className="registro-form" onSubmit={RegistrarSubmit}>
        <label>Nombre</label>
        <input type="text" value={Name} onChange={(e) => setName(e.target.value)} />

        <label>DNI</label>
        <input type="text" value={DNI} onChange={(e) => setDNI(e.target.value)} />

        <label>Usuario</label>
        <input type="text" value={User} onChange={(e) => setUser(e.target.value)} />

        <label>Correo Electrónico</label>
        <input type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />

        <label>Contraseña</label>
        <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />

        <label>Confirmar Contraseña</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Link to="/inicio">¿Ya tenés cuenta? Iniciá sesión</Link>
        <input className="btn-registrar" type="submit" value="Registrar" />
      </form>
    </div>
  )
}

export default Registrar