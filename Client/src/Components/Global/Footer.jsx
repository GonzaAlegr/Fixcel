import React from 'react'
import '../Layouts.css'
import Fixcel from './img/fixcel.png'
import Letra from './img/fixcel.png'
import Eng from './img/fixx.png'

function Footer() {
  return (
    <>
    <footer className='footer'>
        <div className="logo-container">
          <img src={Eng} alt="Fixcel logo" className="engf" />
          <img src={Letra} alt="Fixcel name" className="letra" />
          </div>
        <p className="footer-info">
        © 2025 Fixcel. Empresa dedicada a la <strong>venta y reparación de celulares</strong>.  
        Fundada en 2025, trabajamos con compromiso, calidad y confianza para ofrecer el mejor servicio a nuestros clientes.
        </p>
        <p className="footer-copy">Todos los derechos reservados.</p>
    </footer>
    </>
  )
}

export default Footer
