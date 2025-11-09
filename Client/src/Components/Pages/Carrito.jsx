import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Layouts.css';

const imagenes = import.meta.glob('../Global/img/*', { eager: true })


function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Obtener usuario desde localStorage
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
  const user = usuarioGuardado ? usuarioGuardado.user : null;

  const obtenerImagen = (nombre) => {
    const ruta = `../Global/img/${nombre}`
    if (imagenes[ruta]) {
      return imagenes[ruta].default
    } else {
      return imagenes['../Global/img/default.jpg'].default
    }
  }

  // Cargar carrito desde el servidor
  useEffect(() => {
    if (!user) {
      setCargando(false);
      return;
    }

    axios.get(`http://localhost:3000/server/Carrito/${user}`)
      .then(res => {
        setCarrito(res.data);
        setCargando(false);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el carrito. Intenta más tarde.',
          confirmButtonColor: '#1e3a8a'
        });
        setCargando(false);
      });
  }, [user]);

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/server/EliminarDelCarrito/${id}`)
          .then(res => {
            setCarrito(prev => prev.filter(item => item.ID !== id));
            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado',
              text: res.data.mensaje,
              confirmButtonColor: '#1e3a8a'
            });
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el producto del carrito.',
              confirmButtonColor: '#1e3a8a'
            });
          });
      }
    });
  };

  // Mostrar total
  const total = carrito.reduce((acc, item) => acc + item.Price * item.Cantidad, 0);

  // Renderizado
  if (cargando) {
    return (
      <div className="carrito-container">
        <h2>🛒 Cargando carrito...</h2>
      </div>
    );
  }

  if (!user) {
    Swal.fire({
      icon: 'info',
      title: 'Inicia sesión',
      text: 'Debes iniciar sesión para ver tu carrito.',
      confirmButtonColor: '#1e3a8a'
    });
    return (
      <div className="carrito-container">
        <h2>🛒 Carrito</h2>
        <p>Debes iniciar sesión para acceder a tu carrito.</p>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h2>🛒 Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p>No tienes productos en tu carrito.</p>
      ) : (
        <div className="productos-containerr">
          {carrito.map((item) => (
            <div key={item.ID} className="card-productoo">
              <img
                src={obtenerImagen(item.Imagen)}
                alt={item.Model}
                className="img-producto"
              />
              <div className="descripcionn">
                <h4>{item.Model}</h4>
                <p>Cantidad: {item.Cantidad}</p>
                <p>Precio unitario: ${item.Price}</p>
                <p><b>Subtotal:</b> ${item.Price * item.Cantidad}</p>
              </div>
              <button
                className="btn-rojo"
                onClick={() => eliminarDelCarrito(item.ID)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="carrito-total">
            <h3>Total: ${total}</h3>
            <button
              className="btn-verde"
              onClick={() =>
                Swal.fire({
                  icon: 'success',
                  title: 'Compra finalizada',
                  text: 'Tu pedido fue registrado correctamente ✅',
                  confirmButtonColor: '#1e3a8a'
                })
              }
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
