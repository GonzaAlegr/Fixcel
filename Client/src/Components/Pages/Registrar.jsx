import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'
import '../Layouts.css'

function Registrar() {
  const [User, setUser] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [Name, setName] = useState('')
  const [DNI, setDNI] = useState('')

  const RegistrarSubmit = async (e) => {
    e.preventDefault()

    // 🔒 Verificar que las contraseñas coincidan
    if (Password !== ConfirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Por favor verifica las contraseñas antes de continuar.',
        confirmButtonColor: '#d33',
      })
      return
    }

    try {
      const ServidorBack = await axios.post('http://localhost:4000/server/RegistrarUsuario', {
        User,
        Password,
        Name,
        DNI
      })

      // ✅ Mostrar alerta de éxito con React Icon embebido
     Swal.fire({
  icon: 'success',
  title: '¡Registro exitoso!',
  text: ServidorBack.data.mensaje || 'Usuario creado correctamente.',
  confirmButtonColor: '#3085d6',
});

      // Limpiar campos
      setUser('')
      setPassword('')
      setConfirmPassword('')
      setName('')
      setDNI('')
    } catch (Error) {
      console.log(Error)
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Hubo un problema al registrar. Intenta de nuevo.',
        confirmButtonColor: '#d33',
      })
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

        <label>Contraseña</label>
        <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />

        <label>Confirmar Contraseña</label>
        <input type="password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <input className="btn-registrar" type="submit" value="Registrar" />
      </form>
    </div>
  )
}

export default Registrar
