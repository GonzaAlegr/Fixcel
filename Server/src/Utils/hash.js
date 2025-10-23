const Encriptar= require('bcrypt')
const Salto=10

//metodo de encriptar contraseña
const PasswordEncriptar=async(Password)=>{
    const Seguridad= Encriptar.genSalt(Salto)
    return Encriptar.hash(Password,Seguridad)
}

// metodo de comparar bd  e input(react)
const CompararPassword=async(Password,Parametro)=>{
    return await Encriptar.compare(Password,Parametro)
}

module.exports={PasswordEncriptar,CompararPassword}
