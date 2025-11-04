import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Layouts.css'
import Eng from '../Global/img/fixx.png'
import Logo from '../Global/img/fixcellogo.png'
import Banner1 from '../Global/img/10.jpg'
import Banner2 from '../Global/img/9.jpg'
import Banner3 from '../Global/img/8.jpg'

    function Inicio() {
        const [productos, setProductos] = useState([])

        useEffect(() => {
            axios.get('http://localhost:3000/server/Productos')
                .then(res => {
                    // Muestra solo los primeros 4 productos
                    setProductos(res.data.slice(0, 4))
                })
                .catch(err => console.error('Error al obtener productos destacados:', err))
        }, [])


        return (
            <div className="inicio-container">
                <div className='cajalogo'>
                    <div className="inicio-logo">
                        <img src={Logo} alt="Fixcel logo" className="inicio-logo" />
                    </div>

                    <h2 className="inicio-eslogan">
                        Innovamos para reparar tu mundo
                    </h2>
                </div>

                {/* Productos destacados */}
                <section className="productos-destacados">
                    <h2 className="titulo">Productos destacados</h2>
                    <div className="grid-productos">
                        {productos.map((p) => (
                            <div className="card-producto" key={p.ID}>
                                <img src={`/images/${p.Model}.jpg`} alt={p.Model} className="img-producto" />
                                <h3>{p.Brand} {p.Model}</h3>
                                <p className="descripcion">{p.Description}</p>
                                <p><b>Precio:</b> ${p.Price}</p>
                                <button className="btn-comprar">Comprar</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        )
    }

    export default Inicio
