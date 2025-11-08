import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../Layouts.css'

function RegistrarReparaciones() {
    const [DNI, setDNI] = useState('')
    const [User, setUser] = useState('')
    const [Model, setModel] = useState('')
    const [Description, setDescription] = useState('')

    const RegistrarReparacionSubmit = async (e) => {
        e.preventDefault()

        if (!DNI || !User || !Model || !Description) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos antes de continuar.',
                confirmButtonColor: '#d33',
            })
            return
        }

        try {
            const reparacionData = {
                DNI,       // coincide con lo que espera tu controlador (si usa `const { DNI, ... }`)
                User,
                Model,
                Description,
            }

            // 🔁 Usamos '/server/reparaciones/registrar' para ser equivalente a tu/RegistrarProducto
            const ServidorBack = await axios.post(
                'http://localhost:3000/server/reparaciones/registrar',
                reparacionData
            )

            Swal.fire({
                icon: 'success',
                title: '¡Reparación registrada!',
                text: ServidorBack.data.mensaje || 'La reparación se guardó correctamente.',
                confirmButtonColor: '#3085d6',
            })

            // limpiar formulario
            setDNI('')
            setUser('')
            setModel('')
            setDescription('')
        } catch (Error) {
            // Mostrar info útil para debug
            console.error('❌ Error al registrar reparación:', Error.response?.data || Error.message)

            Swal.fire({
                icon: 'error',
                title: 'Error al guardar',
                // si el backend devolvió { Error: '...' } lo mostramos; si no, mostramos message general
                text: Error.response?.data?.Error || Error.response?.data?.mensaje || Error.message,
                confirmButtonColor: '#d33',
            })
        }
    }

    return (
        <div className="registro-container">
            <h1 className="registro-titulo">Registrar Reparación</h1>

            <form className="registro-form" onSubmit={RegistrarReparacionSubmit}>
                <label>DNI del cliente</label>
                <input
                    type="text"
                    value={DNI}
                    onChange={(e) => setDNI(e.target.value)}
                    placeholder="Ej: 40987654"
                />

                <label>Usuario</label>
                <input
                    type="text"
                    value={User}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Nombre de usuario"
                />

                <label>Modelo</label>
                <input
                    type="text"
                    value={Model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Ej: iPhone 13, Samsung S21..."
                />

                <label>Descripción del problema</label>
                <textarea
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe el inconveniente"
                />

                <Link to="/reparaciones">Ver reparaciones</Link>
                <input
                    className="btn-registrar"
                    type="submit"
                    value="Guardar reparación"
                />
            </form>
        </div>
    )
}

export default RegistrarReparaciones