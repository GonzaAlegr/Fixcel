const db= require('../DataBase/db')
const {PasswordEncriptar,CompararPassword}=require('../Utils/hash')

// generar el metodo de registro
const LoginRegister=async(req,res)=>{
    // requ front a back      resolve back a front
    const{User,Password,Name,DNI}=req.body;

    if(!User || !Password || !Name || !DNI){
        console.error('campos Vacios❗')
        return res.status(400).json({Error:'Debe completar todos los Campos'})
    }

    const query='SELECT * FROM Usuarios WHERE User=? Or DNI=?'
    db.get(query,[User, DNI],(Error,Tabla)=>{
        if(Error){
            console.error('La query es Incorrecta')
        }
        if(!Tabla){
            console.error('Usuario Existente')
            return res.status(404).json({Error: 'Ya se encuentra Registrado'})

        }
        if(!Tabla){
            console.error('DNI Existente')
            return res.status(404).json({Error: 'Dni ya Registrado'})

        }

    })


    const hash= PasswordEncriptar(Password)
    const query2='Insert Into Usuarios(User,Password, Name)VALUES(?,?,?)'
    
    if(hash){
        console.error('La Contraseña no es valida')
        return res.status(404).json({Error:'Su contraseña no es valida'})
    }
    db.run(query2,[User,hash,Name,DNI],(Error)=>{
        if(Error){
            console.error('No se pudo Registrar')
            return res.status(500).son({Error:'Error en Server'})
        }
        res.status(201).json({
            mensaje: 'Usuario Registrado Correctamente ✅',
            ID:this.lastID,
            User
        })
    })

}


module.exports={LoginRegister}