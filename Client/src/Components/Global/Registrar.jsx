import axios from 'axios'
import { useState } from 'react'
import '../Layouts.css'

function Registrar() {
    const[User, setUser] = useState('')
    const[Password, setPassword] = useState('')
    const[Name, setName] = useState('')
    const[DNI, setDNI] = useState('')

    const[Msg ,setMsg] =useState('')

    const RegistrarSubmit=async(e)=>{
        e.preventDefault();
        setMsg('')

       try{
         const ServidorBack= await axios.post('http://localhost:4000/server/RegistrarUsuario',{
            User,
            Password,
            Name,
            DNI
        })
        setMsg(ServidorBack.data.mensaje || 'Datos Registrados')
        setName('')
        setPassword('')
        setUser('')
        setDNI('')
       }
       catch(Error){
        console.log(Error)
       }
    }
  return (
     <>
            <div className="registro-container">
                <h1 className="registro-titulo">Registro</h1>

                <form className="registro-form" onSubmit={RegistrarSubmit}>
                    <label htmlFor="">Usuario</label>
                    <input
                        type="text"
                        name="User"
                        id="User"
                        value={User}
                        onChange={e => setUser(e.target.value)}
                    />

                    <label htmlFor="">Password</label>
                    <input
                        type="Password"
                        name="Password"
                        id="Password"
                        value={Password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        name="Name"
                        id="Name"
                        value={Name}
                        onChange={e => setName(e.target.value)}
                    />

                     <label htmlFor="">DNI</label>
                    <input
                        type="text"
                        name="DNI"
                        id="DNI"
                        value={DNI}
                        onChange={e => setDNI(e.target.value)}
                    />


                    <input className="btn-registrar" type="submit" value="Registrar" />
                </form>

                {Msg && <p className="mensaje">{Msg}</p>}
            </div>
        </>
  )
}

export default Registrar
