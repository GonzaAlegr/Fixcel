import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Layouts.css'
import Eng from '../Global/img/fixx.png'
import Logo from '../Global/img/fixcellogo.png'

// Si tus banners están en /public/images/banner1.jpg, etc.
const banners = [
    '/images/banner1.jpg',
    '/images/banner2.jpg',
    '/images/banner3.jpg'
]

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

    // Carrusel automático
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
        }, 3000)
        return () => clearInterval(interval)
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

            {/* Carrusel */}
            <div className="inicio-carrusel">
                <img
                    src={banners[currentIndex]}
                    alt={`banner-${currentIndex}`}
                    className="carrusel-img"
                />
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
