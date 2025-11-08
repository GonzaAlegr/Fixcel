import React from 'react'
import { Link } from 'react-router-dom'
import '../Layouts.css'
import RegistrarReparacion from './RegistrarReparaciones'
import Servicio1 from '../Global/img/servicio1.jpg'
import Servicio2 from '../Global/img/servicio2.jpg'
import Servicio3 from '../Global/img/servicio3.jpg'

function Servicios() {
  return (
    <section className="servicios">
      <div className='titulocaja'>
        <Link to="/servi" className="titulo">Nuestros servicios</Link>
      </div>
      <div className="cajaprincipal">

        <div className="columna-servicios">
          <div className="servicio-cardd">
            <img src={Servicio1} alt="Reparación" />
            <div className='serviciopa'>
              <p>Reparación de celulares: solucionamos fallas de hardware y software.</p>
            </div>
          </div>

          <div className="servicio-cardd">
            <img src={Servicio2} alt="Cambio" />
            <div className='serviciopa'>
              <p>Cambio de pantallas rotas con repuestos de alta calidad.</p>
            </div>
          </div>

          <div className="servicio-cardd">
            <img src={Servicio3} alt="Reemplazo" />
            <div className='serviciopa'>
              <p>Reemplazo de baterías para que tu dispositivo recupere autonomía.</p>
            </div>
          </div>
        </div>

        <div className="formulario-reparacion">
          <RegistrarReparacion />
        </div>
      </div>
    </section>
  )
}

export default Servicios