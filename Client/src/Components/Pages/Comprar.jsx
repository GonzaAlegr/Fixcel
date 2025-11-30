import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Layouts.css' 

function formatCurrency(n) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n)
}

function Comprar() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [orderNumber, setOrderNumber] = useState(null)
  const [cart, setCart] = useState([])
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: '',
    address: '',
    city: '',
    method: 'Tarjeta',
    cardMasked: '**** **** **** 1234'
  })

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart') || 'null')
      const storedInfo = JSON.parse(localStorage.getItem('checkoutInfo') || 'null')
      if (storedCart && Array.isArray(storedCart) && storedCart.length) {
        setCart(storedCart)
      } else {
        setCart([
          { id: 1, title: 'Iphone', qty: 1, price: 12999 },
          { id: 2, title: 'Samsung', qty: 1, price: 8999 }
        ])
      }
      if (storedInfo) {
        setCheckoutInfo(prev => ({ ...prev, ...storedInfo }))
      } else {
        setCheckoutInfo(prev => ({ ...prev, name: 'Visitante de la Tecnica', address: 'Guemes 2051', city: 'Monte Grande', method: 'Tarjeta', cardMasked: '**** **** **** 4321' }))
      }
    } catch (e) {
      console.warn('Error leyendo localStorage, usando valores por defecto')
    }

    const t = setTimeout(() => {
      const now = Date.now().toString().slice(-6)
      const random = Math.floor(Math.random() * 900) + 100
      setOrderNumber(`ORD-${now}-${random}`)
      setLoading(false)

    }, 1700)

    return () => clearTimeout(t)
  }, [])

  const subtotal = cart.reduce((s, it) => s + it.price * (it.qty || 1), 0)
  const shipping = subtotal > 20000 ? 0 : 1499 
  const total = subtotal + shipping

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen p-6">
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto 18px', width: 72, height: 72, borderRadius: '50%', borderTop: '6px solid #2563eb', border: '6px solid #e5e7eb', animation: 'spin 1s linear infinite' }} />
          <h2 className="titulo">Procesando tu orden</h2>
          <p className="subtitulo">Estamos finalizando los detalles. Un momento por favor...</p>
        </div>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          .titulo { font-size: 1.25rem; font-weight: 700; color:#111827; margin: 8px 0; text-align:center; }
          .subtitulo { color:#6b7280; text-align:center }
        `}</style>
      </div>
    )
  }

  return (
    <div className="container py-8" style={{ maxWidth: 940, margin: '0 auto' , color:'#374151' }}>
      <div className="card" style={{ padding: 24, borderRadius: 12, boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>
        <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 18 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>¡Gracias por tu compra!</h1>
            <p style={{ margin: '6px 0 0', color:'#ffffffff' }}>Tu orden fue registrada correctamente.</p>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontWeight:700 }}>{orderNumber}</div>
            <div style={{ color:'#6b7280', fontSize:'0.9rem' }}>Fecha: {new Date().toLocaleString('es-AR')}</div>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
          <div>
            <div style={{ marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontSize: '1.05rem', color:'#374151' }}>Detalles de envío</h2>
              <div style={{ color:'#374151', marginTop:8 }}>
                <div><strong>{checkoutInfo.name}</strong></div>
                <div>{checkoutInfo.address}</div>
                <div>{checkoutInfo.city}</div>
              </div>
            </div>

            <div>
              <h2 style={{ margin: '12px 0 8px' }}>Resumen de productos</h2>
              <div style={{ border: '1px solid #e6e6e6', borderRadius: 8, padding: 12 }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display:'flex', justifyContent:'space-between', padding:'10px 6px', borderBottom:'1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontWeight:600 }}>{item.title}</div>
                      <div style={{ color:'#6b7280', fontSize:'0.9rem' }}>Cantidad: {item.qty || 1}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontWeight:700 }}>{formatCurrency(item.price * (item.qty || 1))}</div>
                      <div style={{ color:'#9ca3af', fontSize:'0.85rem' }}>{formatCurrency(item.price)} c/u</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside style={{ background:'#f9fafb', padding:16, borderRadius:10 }}>
            <h3 style={{ margin:0 }}>Pago y entrega</h3>
            <div style={{ marginTop:10, color:'#374151' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span>Envío</span>
                <strong>{shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</strong>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', paddingTop:8, borderTop:'1px solid #e5e7eb', marginTop:8 }}>
                <span style={{ fontWeight:700 }}>Total</span>
                <span style={{ fontWeight:700 }}>{formatCurrency(total)}</span>
              </div>

              <div style={{ marginTop:14 }}>
                <div style={{ color:'#6b7280', fontSize:'0.95rem' }}>Método de pago</div>
                <div style={{ marginTop:6, fontWeight:700 }}>{checkoutInfo.method} • {checkoutInfo.cardMasked}</div>
              </div>

              <div style={{ marginTop:18, display:'flex', gap:8 }}>
                <button onClick={() => navigate('/mis-compras')} className="btn" style={{ flex:1, padding:'10px 12px', borderRadius:8, background:'#111827', color:'#fff', border:'none' }}>
                  Ver mis compras
                </button>
                <button onClick={() => navigate('/')} className="btn-outline" style={{ flex:1, padding:'10px 12px', borderRadius:8, border:'1px solid #d1d5db', background:'#fff' }}>
                  Seguir comprando
                </button>
              </div>
            </div>
          </aside>
        </section>

        <footer style={{ marginTop:20, color:'#6b7280', fontSize:'0.9rem' }}>
          Si querés, podés imprimir esta página como comprobante o guardar el número de orden para hacer seguimiento.
        </footer>
      </div>
    </div>
  )
}

export default Comprar