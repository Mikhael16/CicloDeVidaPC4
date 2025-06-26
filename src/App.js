import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import fondo from './assets/img/imagenfondoprimerapantalla.jpg';
import qr from './assets/img/qr-code-logo-png_seeklogo-217342.png';
import cuyImg from './assets/img/cuy.png';
import cecinasImg from './assets/img/tacacho-con-cecina.jpg'; // No hay imagen de cecinas, se usa el QR temporalmente
import pancetaImg from './assets/img/panceta.jpg';
import cabritoImg from './assets/img/cabrito.jpg';
import pepiangallinaImg from './assets/img/pepiangallina.jpg';
import pepiancabritoImg from './assets/img/pepiancabrito.jpg';
import asispedidosImg from './assets/img/asispedidos.jpg';
import tobepedidosImg from './assets/img/tobepedidos.jpg';
import asisinventarioImg from './assets/img/asisinventario.jpg';
import tobeinventarioImg from './assets/img/tobeinventario.jpg';

const platos = [
  {
    nombre: '1/2 Cuy',
    descripcion: 'Arroz blanco, ajiaco',
    precio: 39,
    img: cuyImg,
  },
  {
    nombre: 'Cecinas',
    descripcion: 'Arroz blanco, ajiaco',
    precio: 34,
    img: cecinasImg,
  },
  {
    nombre: 'Panceta chancho al cilindro',
    descripcion: 'Arroz blanco, ajíaco',
    precio: 29,
    img: pancetaImg,
  },
  {
    nombre: 'Cabrito',
    descripcion: 'Arroz blanco, frejoles, yuca',
    precio: 29,
    img: cabritoImg,
  },
  {
    nombre: 'Pepián de gallina',
    descripcion: 'Yuca, encurtido',
    precio: 27,
    img: pepiangallinaImg,
  },
  {
    nombre: 'Pepián con cabrito',
    descripcion: 'Yuca, encurtido',
    precio: 29,
    img: pepiancabritoImg,
  },
];

const entradas = [
  { nombre: 'Papa a la huancaína', precio: 12 },
  { nombre: 'Causa limeña', precio: 13 },
  { nombre: 'Tamales', precio: 10 },
];
const postres = [
  { nombre: 'Mazamorra morada', precio: 8 },
  { nombre: 'Arroz con leche', precio: 8 },
  { nombre: 'Suspiro a la limeña', precio: 10 },
];
const bebidas = [
  { nombre: 'Coca Cola', jarra: 15 },
  { nombre: 'Inca Kola', jarra: 15 },
  { nombre: 'Sprite', jarra: 15 },
  { nombre: 'Té helado', jarra: 12 },
  { nombre: 'Infusión', jarra: 12 },
  { nombre: 'Vino tinto', botella: 45 },
  { nombre: 'Vino blanco', botella: 45 },
];

const insumosBase = [
  { nombre: 'Arroz', unidad: 'kg', cantidad: 10.0, min: 10, precio: 3.2, uso: 1.0 }, // rojo y en predicción
  { nombre: 'Aceite', unidad: 'L', cantidad: 2.2, min: 3, precio: 8.5, uso: 0.7 }, // rojo
  { nombre: 'Pollo', unidad: 'kg', cantidad: 4.8, min: 5, precio: 12.0, uso: 0.8 }, // rojo
  { nombre: 'Cuy', unidad: 'kg', cantidad: 7.2, min: 2, precio: 35.0, uso: 0.2 },
  { nombre: 'Papa', unidad: 'kg', cantidad: 12.5, min: 8, precio: 2.1, uso: 0.6 },
  { nombre: 'Cebolla', unidad: 'kg', cantidad: 14.3, min: 4, precio: 2.8, uso: 0.3 },
  { nombre: 'Aji', unidad: 'kg', cantidad: 6.9, min: 2, precio: 6.0, uso: 0.2 },
  { nombre: 'Yuca', unidad: 'kg', cantidad: 10.5, min: 3, precio: 2.5, uso: 0.3 },
  { nombre: 'Frejoles', unidad: 'kg', cantidad: 8.6, min: 2, precio: 4.2, uso: 0.2 },
  { nombre: 'Vino', unidad: 'L', cantidad: 5.1, min: 1, precio: 18.0, uso: 0.1 },
];

const usoSemanal = (insumo) => {
  // Datos inventados para una semana de junio
  const dias = ['Lun 12', 'Mar 13', 'Mié 14', 'Jue 15', 'Vie 16', 'Sáb 17', 'Dom 18'];
  // Generar valores random pero coherentes según el uso
  return dias.map((dia, i) => ({
    dia,
    usado: Math.round((Math.random() * 0.5 + 0.5) * (insumo.uso * 2 + 0.5) * 100) / 100
  }));
};

function AnimatedContainer({ children }) {
  return (
    <div style={{
      animation: 'fadeSlideIn 0.5s',
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#f8fafc',
    }}>
      {children}
    </div>
  );
}

function Login({ onLogin, onForgot, onCliente }) {
  const [role, setRole] = useState('cocinero');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-bg" style={{ background: `linear-gradient(rgba(30, 41, 59, 0.7), rgba(30, 41, 59, 0.7)), url(${fondo}) center center/cover no-repeat` }}>
      <div className="login-card">
        <div className="login-header">
          <div className="qr-logo-wrap">
            <img src={qr} alt="QR" className="qr-img" />
          </div>
          <div>
            <div className="logo-title">Lugar Para Recordar</div>
            <div className="subtitle">Culturally inspired logo</div>
          </div>
        </div>
        <div className="login-title">Inicio de sesión</div>
        <div className="toggle-buttons">
          <button className={`toggle${role === 'cocinero' ? ' active' : ''}`} onClick={() => setRole('cocinero')}>Cocinero</button>
          <button className={`toggle${role === 'gerente' ? ' active' : ''}`} onClick={() => setRole('gerente')}>Gerente</button>
        </div>
        <div className="input-group">
          <input type="text" placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} autoComplete="username" />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
        </div>
        <button className="login-btn" onClick={() => onLogin(role)}>
          Iniciar sesión como {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
        <button className="cliente-btn" onClick={onCliente}>Ingresar como cliente</button>
        <div className="forgot-link" onClick={onForgot}>¿Olvidaste tu contraseña?</div>
      </div>
    </div>
  );
}

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="login-bg" style={{ background: `linear-gradient(rgba(30, 41, 59, 0.7), rgba(30, 41, 59, 0.7)), url(${fondo}) center center/cover no-repeat` }}>
      <div className="login-card">
        <div className="login-header">
          <div className="qr-logo-wrap">
            <img src={qr} alt="QR" className="qr-img" />
          </div>
          <div>
            <div className="logo-title">Recuperar contraseña</div>
            <div className="subtitle">Te enviaremos un enlace a tu correo</div>
          </div>
        </div>
        <div className="input-group">
          <input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
        </div>
        <button className="login-btn" onClick={() => setSent(true)}>Enviar enlace</button>
        <div className="forgot-link" onClick={onBack}>Volver al login</div>
        {sent && <div className="success-msg">¡Enlace enviado! Revisa tu correo.</div>}
      </div>
    </div>
  );
}

function PedidoDetalle({ pedido, onBack, onCulminar }) {
  const minutos = Math.floor((Date.now() - pedido.hora) / 60000);
  const velocidad = minutos < 2 ? 'fluido' : minutos < 5 ? 'normal' : 'lento';
  return (
    <div className="role-bg">
      <div className="role-card" style={{maxWidth: 420}}>
        <button className="menu-back" onClick={onBack}>⟵</button>
        <h2>Detalle del Pedido</h2>
        <img src={pedido.img} alt={pedido.plato} className="menu-img" style={{marginBottom:8}} />
        <div style={{fontWeight:600, fontSize:'1.1rem'}}>Mesa {pedido.mesa} - {pedido.plato}</div>
        <div style={{margin:'8px 0', color:'#64748b'}}>Requerimiento especial: <b>{pedido.detalles}</b></div>
        <div style={{margin:'8px 0', color:'#2563eb', fontWeight:500}}>
          Tiempo: {minutos} min
          <span style={{marginLeft:12, color: velocidad==='fluido'?'#22c55e':velocidad==='normal'?'#facc15':'#ef4444', fontWeight:700}}>
            {velocidad === 'fluido' ? 'Fluido' : velocidad === 'normal' ? 'Normal' : 'Lento'}
          </span>
        </div>
        <button className="menu-finalizar" onClick={() => onCulminar(pedido.id)}>Marcar como Listo</button>
      </div>
    </div>
  );
}

function getRandomPedido(id, platos, entradas, bebidas) {
  const mesa = Math.floor(Math.random() * 12) + 1;
  const plato = platos[Math.floor(Math.random() * platos.length)];
  const entrada = Math.random() < 0.5 ? entradas[Math.floor(Math.random() * entradas.length)] : null;
  const bebida = Math.random() < 0.7 ? bebidas[Math.floor(Math.random() * bebidas.length)] : null;
  const detallesArr = [
    'Sin cebolla',
    'Poco picante',
    'Sin ají',
    'Con camote extra',
    'Sin arroz',
    'Extra salsa',
    'Sin huevo',
    'Con salsa de soya extra',
    'Sin sal',
    'Sin azúcar',
    'Con hielo',
    'Sin hielo',
    'Con limón',
    'Sin limón',
    'Con pan',
    'Sin pan',
    'Con yuca extra',
    'Sin encurtido',
    'Sin frejoles',
    'Con arroz extra',
  ];
  const detalles = [
    (entrada ? `Entrada: ${entrada.nombre}` : null),
    `Plato: ${plato.nombre}`,
    (bebida ? `Bebida: ${bebida.nombre}` : null),
    detallesArr[Math.floor(Math.random() * detallesArr.length)]
  ].filter(Boolean).join('. ');
  return {
    id,
    mesa,
    plato: plato.nombre,
    img: plato.img,
    detalles,
    urgente: Math.random() < 0.3,
    hora: Date.now(),
    estado: 'pendiente',
  };
}

function InfoModal({ open, onClose, asIsTitle, asIsImg, toBeTitle, toBeImg }) {
  if (!open) return null;
  return (
    <div className="modal-bg" style={{zIndex: 2000}}>
      <div className="modal-card" style={{ position: 'relative', maxWidth: 350, width: '90vw', padding: 24, boxShadow: '0 8px 40px rgba(30,41,59,0.18)' }}>
        <button
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'none',
            border: 'none',
            fontSize: 22,
            color: '#64748b',
            cursor: 'pointer',
            zIndex: 2,
          }}
          aria-label="Cerrar"
          onClick={onClose}
        >✕</button>
        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>{asIsTitle}</div>
        <img src={asIsImg} alt={asIsTitle} style={{ width: '100%', borderRadius: 12, marginBottom: 18, boxShadow: '0 2px 12px rgba(30,41,59,0.10)' }} />
        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>{toBeTitle}</div>
        <img src={toBeImg} alt={toBeTitle} style={{ width: '100%', borderRadius: 12, boxShadow: '0 2px 12px rgba(30,41,59,0.10)' }} />
      </div>
    </div>
  );
}

function Cocinero({ onShowInfo }) {
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [orden, setOrden] = useState('tiempo');
  const [detalle, setDetalle] = useState(null);
  const [urgentes, setUrgentes] = useState(false);
  const pedidosCount = useRef(0);
  const intervalRef = useRef();

  useEffect(() => {
    // Inicializa con 2 pedidos
    if (pedidos.length === 0 && pedidosCount.current === 0) {
      const p1 = getRandomPedido(1, platos, entradas, bebidas);
      const p2 = getRandomPedido(2, platos, entradas, bebidas);
      setPedidos([p1, p2]);
      pedidosCount.current = 2;
    }
    // Intervalo para agregar pedidos
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setPedidos(peds => {
          if (pedidosCount.current >= 10) return peds;
          const nuevo = getRandomPedido(peds.length + 1, platos, entradas, bebidas);
          pedidosCount.current += 1;
          return [...peds, nuevo];
        });
      }, 10000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [pedidos]);

  let pedidosFiltrados = pedidos.filter(p => p.estado === 'pendiente');
  if (filtro) pedidosFiltrados = pedidosFiltrados.filter(p => (''+p.mesa).includes(filtro));
  if (urgentes) pedidosFiltrados = pedidosFiltrados.filter(p => p.urgente);
  pedidosFiltrados = [...pedidosFiltrados].sort((a, b) => orden === 'tiempo' ? a.hora - b.hora : b.urgente - a.urgente);

  if (detalle) {
    return <PedidoDetalle pedido={detalle} onBack={() => setDetalle(null)} onCulminar={id => {
      setPedidos(peds => peds.map(p => p.id === id ? { ...p, estado: 'listo' } : p));
      setDetalle(null);
    }} />;
  }

  return (
    <>
      <div style={{padding:'0 16px',width:'100%',maxWidth:320,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:8,margin:'10px 0'}}>
          <div style={{background:'#f1f5f9',borderRadius:16,padding:'8px 12px',flex:1,display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:'1.2rem'}}>🔍</span>
            <input style={{border:'none',background:'transparent',outline:'none',fontSize:'1rem',flex:1}} placeholder="Filtrar por mesa" value={filtro} onChange={e=>setFiltro(e.target.value)} />
          </div>
        </div>
        <div style={{display:'flex',gap:8,marginBottom:12}}>
          <button className="login-btn" style={{flex:1,background:orden==='tiempo'?'#2563eb':'#f1f5f9',color:orden==='tiempo'?'#fff':'#2563eb'}} onClick={()=>{setOrden('tiempo');setUrgentes(false);}}>Ordenar por tiempo</button>
          <button className="login-btn" style={{flex:1,background:urgentes?'#2563eb':'#f1f5f9',color:urgentes?'#fff':'#2563eb'}} onClick={()=>{setUrgentes(u=>!u);}}>Ver urgentes</button>
        </div>
      </div>
      <div className="menu-lista">
        {pedidosFiltrados.map(p => (
          <div key={p.id} className="menu-card" style={{cursor:'pointer',padding:'10px 8px 12px 8px',maxWidth: '280px',margin: '0 auto'}} onClick={()=>setDetalle(p)}>
            <img src={p.img} alt={p.plato} className="menu-img" style={{minHeight:90,objectFit:'cover',background:'#e5e7eb',display:'block',margin:'0 auto',maxWidth:'180px'}} />
            <div className="menu-nombre" style={{marginTop:6}}>Mesa {p.mesa}</div>
            <div className="menu-desc">{p.plato}</div>
            <button className="menu-agregar" style={{margin:'10px auto 0 auto',background:'#e0e7ef',color:'#2563eb',maxWidth:'160px',display:'block'}} onClick={e=>{e.stopPropagation();setPedidos(peds=>peds.map(x=>x.id===p.id?{...x,estado:'listo'}:x));}}>Marcar como Listo</button>
          </div>
        ))}
        {pedidosFiltrados.length === 0 && <div style={{color:'#64748b',marginTop:32}}>No hay pedidos pendientes.</div>}
      </div>
    </>
  );
}

function randomPhone() {
  const n = () => Math.floor(Math.random() * 10);
  return `+51 9${n()}${n()} ${n()}${n()}${n()}`;
}

function Gerente({ onShowInfo }) {
  const [pantalla, setPantalla] = useState('insumos');
  const [insumos, setInsumos] = useState(insumosBase.map(i => ({ ...i })));
  const [showModal, setShowModal] = useState(false);
  const [modalInsumo, setModalInsumo] = useState(null);
  const [pedidoRealizado, setPedidoRealizado] = useState(false);
  const [showDetalle, setShowDetalle] = useState(false);
  const [detalleInsumo, setDetalleInsumo] = useState(null);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setInsumos(prev => prev.map(i => {
        let dec = (Math.random() * 0.1 + 0.05) * (i.uso || 0.2);
        let nueva = Math.max(i.cantidad - dec, 0);
        return { ...i, cantidad: Math.round(nueva * 100) / 100 };
      }));
    }, 10000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Pronóstico de compra (random razonable)
  const getPronostico = (i) => {
    if (i.cantidad > i.min) return null;
    return Math.round((i.min * 2 + Math.random() * 5) * 100) / 100;
  };

  // Costo estimado
  const getCosto = (i) => {
    const cant = getPronostico(i) || 0;
    return Math.round(cant * i.precio * 100) / 100;
  };

  // Modal emergente
  const handleSolicitar = (insumo) => {
    setModalInsumo(insumo);
    setShowModal(true);
    setPedidoRealizado(false);
  };

  const handleRealizarPedido = () => {
    setPedidoRealizado(true);
    setTimeout(() => {
      setShowModal(false);
      setPedidoRealizado(false);
    }, 3500);
  };

  // Pantalla de insumos
  if (pantalla === 'insumos') {
    return (
      <>
        <div className="gerente-lista">
          {insumos.map(i => (
            <div key={i.nombre} className={`gerente-card${i.cantidad <= i.min ? ' escasez' : ''}`} onClick={()=>{setDetalleInsumo(i);setShowDetalle(true);}}>
              <div className="nombre">{i.nombre}</div>
              <div className="desc">{i.cantidad.toFixed(2)} {i.unidad}</div>
              {i.cantidad <= i.min && <div className="alerta">¡Escasez!</div>}
            </div>
          ))}
        </div>
        {showDetalle && detalleInsumo && (
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(30,41,59,0.25)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',borderRadius:18,padding:28,minWidth:220,maxWidth:320,boxShadow:'0 4px 32px rgba(30,41,59,0.18)'}}>
              <div style={{marginBottom:10}}>
                {usoSemanal(detalleInsumo).map((u, idx) => (
                  <div key={idx} style={{display:'flex',justifyContent:'space-between',marginBottom:2}}>
                    <span style={{color:'#b45309',fontWeight:500}}>{u.dia}</span>
                    <span style={{color:'#2563eb',fontWeight:600}}>{u.usado} {detalleInsumo.unidad}</span>
                  </div>
                ))}
              </div>
              <button className="cliente-btn" style={{marginTop:10,background:'#fef3c7',color:'#b45309'}} onClick={()=>setShowDetalle(false)}>Cerrar</button>
            </div>
          </div>
        )}
        {/* Botón para ir a Predicción de Insumos */}
        <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:24}}>
          <button className="login-btn" style={{maxWidth:320}} onClick={()=>setPantalla('pronostico')}>
            Ir a Predicción de Insumos
          </button>
        </div>
      </>
    );
  }

  // Pantalla de pronóstico
  if (pantalla === 'pronostico') {
    return (
      <>
        <div className="gerente-lista">
          {insumos.filter(i => i.cantidad <= i.min).map(i => (
            <div key={i.nombre} className="gerente-card escasez">
              <div className="nombre">{i.nombre}</div>
              <div className="desc">Actual: {i.cantidad.toFixed(2)} {i.unidad}</div>
              <div className="alerta">¡Escasez!</div>
              <div className="pronostico">Pronóstico: <b>{getPronostico(i)} {i.unidad}</b></div>
              <button className="btn-solicitar" onClick={() => handleSolicitar(i)}>Solicitar pedido</button>
            </div>
          ))}
        </div>
        {showModal && modalInsumo && (
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(30,41,59,0.25)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',borderRadius:18,padding:28,minWidth:220,maxWidth:320,boxShadow:'0 4px 32px rgba(30,41,59,0.18)'}}>
              <div style={{marginBottom:6}}>Pronóstico: <b>{getPronostico(modalInsumo)} {modalInsumo.unidad}</b></div>
              <div style={{marginBottom:6}}>Costo estimado: <b>S/.{getCosto(modalInsumo)}</b></div>
              {!pedidoRealizado ? (
                <button className="login-btn" style={{background:'#ef4444', fontSize: '0.95rem', padding: '7px 0', minWidth: 0, width: '100%'}} onClick={handleRealizarPedido}>Realizar pedido</button>
              ) : (
                <div style={{color:'#22c55e',fontWeight:600,marginTop:10}}>
                  Pedido solicitado al proveedor<br />
                  Terminar el contacto con: <b>{randomPhone()}</b>
                </div>
              )}
              <button className="cliente-btn" style={{marginTop:10,background:'#fef3c7',color:'#b45309'}} onClick={()=>setShowModal(false)}>Cerrar</button>
            </div>
          </div>
        )}
        {/* Botón para volver a Gestión de Insumos */}
        <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:24}}>
          <button className="cliente-btn" style={{maxWidth:320}} onClick={()=>setPantalla('insumos')}>
            Volver a Gestión de Insumos
          </button>
        </div>
      </>
    );
  }
}

function Cliente({ goBack }) {
  return (
    <div className="role-bg">
      <div className="role-card">
        <h2>Menú del restaurante</h2>
        <ul className="menu-list">
          <li>Pizza Margarita 🍕</li>
          <li>Ensalada César 🥗</li>
          <li>Hamburguesa Clásica 🍔</li>
          <li>Pasta Alfredo 🍝</li>
          <li>Postre del día 🍰</li>
        </ul>
        <div className="role-img-placeholder">🧾</div>
      </div>
    </div>
  );
}

function ClienteMenu({ onBack, onFinalizar }) {
  const [carrito, setCarrito] = useState([]);
  const [showGuardado, setShowGuardado] = useState(false);
  const [cantidades, setCantidades] = useState(Array(platos.length).fill(1));
  const [showBebidas, setShowBebidas] = useState(false);
  const [bebidaSeleccionada, setBebidaSeleccionada] = useState(null);
  const [showEntradas, setShowEntradas] = useState(false);
  const [entradaSeleccionada, setEntradaSeleccionada] = useState(null);
  const [showPostres, setShowPostres] = useState(false);
  const [postreSeleccionado, setPostreSeleccionado] = useState(null);
  const [modalTipo, setModalTipo] = useState(null);
  const [modalSeleccion, setModalSeleccion] = useState(null);
  const [showResumenModal, setShowResumenModal] = useState(false);
  const [resumenLoading, setResumenLoading] = useState(false);
  const [errorPedido, setErrorPedido] = useState('');

  const handleAgregar = (idx, event) => {
    const plato = platos[idx];
    const cantidad = cantidades[idx];
    setCarrito([...carrito, { ...plato, cantidad }]);
    
    // Crear pestañita emergente
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const pestañita = document.createElement('div');
    pestañita.className = 'pestañita-confirmacion';
    pestañita.textContent = '¡Agregado!';
    pestañita.style.left = `${rect.left + rect.width/2 - 30}px`;
    pestañita.style.top = `${rect.top - 40}px`;
    
    document.body.appendChild(pestañita);
    
    // Remover pestañita después de la animación
    setTimeout(() => {
      if (pestañita.parentNode) {
        pestañita.parentNode.removeChild(pestañita);
      }
    }, 1500);
  };

  const handleCantidad = (idx, val) => {
    const nuevas = [...cantidades];
    nuevas[idx] = Math.max(1, val);
    setCantidades(nuevas);
  };

  const handleAgregarBebida = (bebida, event) => {
    setBebidaSeleccionada(bebida);
    setShowBebidas(false);
    
    // Crear pestañita emergente
    if (event) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const pestañita = document.createElement('div');
      pestañita.className = 'pestañita-confirmacion';
      pestañita.textContent = '¡Agregado!';
      pestañita.style.left = `${rect.left + rect.width/2 - 30}px`;
      pestañita.style.top = `${rect.top - 40}px`;
      
      document.body.appendChild(pestañita);
      
      setTimeout(() => {
        if (pestañita.parentNode) {
          pestañita.parentNode.removeChild(pestañita);
        }
      }, 1500);
    }
  };

  const handleAgregarEntrada = (entrada, event) => {
    setEntradaSeleccionada(entrada);
    setShowEntradas(false);
    
    // Crear pestañita emergente
    if (event) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const pestañita = document.createElement('div');
      pestañita.className = 'pestañita-confirmacion';
      pestañita.textContent = '¡Agregado!';
      pestañita.style.left = `${rect.left + rect.width/2 - 30}px`;
      pestañita.style.top = `${rect.top - 40}px`;
      
      document.body.appendChild(pestañita);
      
      setTimeout(() => {
        if (pestañita.parentNode) {
          pestañita.parentNode.removeChild(pestañita);
        }
      }, 1500);
    }
  };

  const handleAgregarPostre = (postre, event) => {
    setPostreSeleccionado(postre);
    setShowPostres(false);
    
    // Crear pestañita emergente
    if (event) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const pestañita = document.createElement('div');
      pestañita.className = 'pestañita-confirmacion';
      pestañita.textContent = '¡Agregado!';
      pestañita.style.left = `${rect.left + rect.width/2 - 30}px`;
      pestañita.style.top = `${rect.top - 40}px`;
      
      document.body.appendChild(pestañita);
      
      setTimeout(() => {
        if (pestañita.parentNode) {
          pestañita.parentNode.removeChild(pestañita);
        }
      }, 1500);
    }
  };

  const handleFinalizar = () => {
    const total =
      (carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0) || 0) +
      (bebidaSeleccionada ? (bebidaSeleccionada.jarra || bebidaSeleccionada.botella || 0) : 0) +
      (entradaSeleccionada ? entradaSeleccionada.precio : 0) +
      (postreSeleccionado ? postreSeleccionado.precio : 0);
    if (total === 0) {
      setErrorPedido('Pedido inválido, vuelva a realizarlo');
      setTimeout(() => setErrorPedido(''), 2500);
      return;
    }
    setErrorPedido('');
    onFinalizar({
      platos: carrito,
      bebida: bebidaSeleccionada,
      entrada: entradaSeleccionada,
      postre: postreSeleccionado,
    });
  };

  const handleModalOpen = (tipo) => {
    setModalTipo(tipo);
    setModalSeleccion(null);
  };

  const handleModalGuardar = (event) => {
    if (modalTipo === 'entrada') setEntradaSeleccionada(modalSeleccion);
    if (modalTipo === 'postre') setPostreSeleccionado(modalSeleccion);
    if (modalTipo === 'bebida') setBebidaSeleccionada(modalSeleccion);
    setModalTipo(null);
    
    // Crear pestañita emergente
    if (event) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const pestañita = document.createElement('div');
      pestañita.className = 'pestañita-confirmacion';
      pestañita.textContent = '¡Agregado!';
      pestañita.style.left = `${rect.left + rect.width/2 - 30}px`;
      pestañita.style.top = `${rect.top - 40}px`;
      
      document.body.appendChild(pestañita);
      
      setTimeout(() => {
        if (pestañita.parentNode) {
          pestañita.parentNode.removeChild(pestañita);
        }
      }, 1500);
    }
  };

  return (
    <>
      <div className="menu-header">
        <div className="menu-title">Menú del Restaurante</div>
      </div>
      <div className="menu-categorias">
        <span>
          <button className="menu-bebida-btn" onClick={() => handleModalOpen('entrada')}>
            🍲<br /><small>Entradas{entradaSeleccionada ? `: ${entradaSeleccionada.nombre}` : ''}</small>
          </button>
        </span>
        <span>🍽️<br /><small>Platos<br />Principales</small></span>
        <span>
          <button className="menu-bebida-btn" onClick={() => handleModalOpen('postre')}>
            🍰<br /><small>Postres{postreSeleccionado ? `: ${postreSeleccionado.nombre}` : ''}</small>
          </button>
        </span>
        <span>
          <button className="menu-bebida-btn" onClick={() => handleModalOpen('bebida')}>
            🥤<br /><small>Bebidas{bebidaSeleccionada ? `: ${bebidaSeleccionada.nombre}` : ''}</small>
          </button>
        </span>
      </div>
      <div className="menu-lista">
        {platos.map((plato, idx) => (
          <div className="menu-card" key={plato.nombre}>
            <img src={plato.img} alt={plato.nombre} className="menu-img" />
            <div className="menu-nombre">{plato.nombre} <span className="menu-precio">S/.{plato.precio}</span></div>
            <div className="menu-desc">{plato.descripcion}</div>
            <div className="menu-cantidad">
              <button onClick={() => handleCantidad(idx, cantidades[idx] - 1)} disabled={cantidades[idx] <= 1}>-</button>
              <span>{cantidades[idx]}</span>
              <button onClick={() => handleCantidad(idx, cantidades[idx] + 1)}>+</button>
            </div>
            <button className="menu-agregar" onClick={(e) => handleAgregar(idx, e)}>Agregar al Pedido</button>
          </div>
        ))}
        {errorPedido && (
          <div style={{color:'#ef4444',fontWeight:700,margin:'12px 0',textAlign:'center',background:'#fff6f6',borderRadius:10,padding:'10px 0',boxShadow:'0 1px 8px #fee2e2'}}> {errorPedido} </div>
        )}
        <button className="menu-finalizar" style={{margin:'18px auto 8px auto',display:'block'}} onClick={handleFinalizar}>Finalizar pedido</button>
      </div>
      {modalTipo && (
        <div className="modal-bg">
          <div className="modal-card">
            <div style={{fontWeight:700,marginBottom:10}}>
              Selecciona {modalTipo === 'entrada' ? 'una entrada' : modalTipo === 'postre' ? 'un postre' : 'una bebida'}
            </div>
            {(modalTipo === 'entrada' ? entradas : modalTipo === 'postre' ? postres : bebidas).map((item, idx) => (
              <div key={item.nombre} className="modal-option" onClick={() => setModalSeleccion(item)}>
                <span>{item.nombre}</span>
                <span className="menu-bebida-precio">
                  {item.jarra && <>Jarra S/.{item.jarra}</>}
                  {item.botella && <>Botella S/.{item.botella}</>}
                </span>
                <span className="modal-check">{modalSeleccion === item ? '✔' : ''}</span>
              </div>
            ))}
            <button className="modal-btn" onClick={(e) => handleModalGuardar(e)} disabled={!modalSeleccion}>Guardar</button>
            <button className="cliente-btn" style={{marginTop:8}} onClick={()=>setModalTipo(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
}

function ClienteResumen({ pedido, onBack, onProceder }) {
  const totalPlatos = pedido.platos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  let bebidaPrecio = 0;
  if (pedido.bebida) {
    bebidaPrecio = pedido.bebida.jarra || pedido.bebida.botella || 0;
  }
  let entradaPrecio = pedido.entrada ? pedido.entrada.precio : 0;
  let postrePrecio = pedido.postre ? pedido.postre.precio : 0;
  const total = totalPlatos + bebidaPrecio + entradaPrecio + postrePrecio;
  const [showPedidoModal, setShowPedidoModal] = useState(false);
  const [pedidoRegistrado, setPedidoRegistrado] = useState(false);

  const handleProceder = () => {
    setShowPedidoModal(true);
    setTimeout(() => setPedidoRegistrado(true), 1800);
    setTimeout(() => { setShowPedidoModal(false); setPedidoRegistrado(false); onProceder(); }, 3500);
  };

  return (
    <>
      <div className="role-card">
        <h2>Resumen del pedido</h2>
        <ul className="menu-list" style={{marginBottom: 12}}>
          {pedido.entrada && (
            <li style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontWeight:600}}>{pedido.entrada.nombre}</span>
              <span style={{marginLeft:'auto'}}>S/.{pedido.entrada.precio}</span>
            </li>
          )}
          {pedido.platos.map((p, i) => (
            <li key={i} style={{display:'flex',alignItems:'center',gap:8}}>
              <img src={p.img} alt={p.nombre} style={{width:40,height:40,borderRadius:8,objectFit:'cover'}} />
              <span style={{fontWeight:600}}>{p.nombre}</span>
              <span>x{p.cantidad}</span>
              <span style={{marginLeft:'auto'}}>S/.{p.precio * p.cantidad}</span>
            </li>
          ))}
          {pedido.postre && (
            <li style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontWeight:600}}>{pedido.postre.nombre}</span>
              <span style={{marginLeft:'auto'}}>S/.{pedido.postre.precio}</span>
            </li>
          )}
          {pedido.bebida && (
            <li style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontWeight:600}}>{pedido.bebida.nombre}</span>
              <span style={{marginLeft:'auto'}}>S/.{bebidaPrecio}</span>
            </li>
          )}
        </ul>
        <div style={{fontWeight:700,fontSize:'1.1rem',marginBottom:16}}>Total a cancelar: S/.{total}</div>
        <div style={{color:'#22c55e',fontWeight:600,marginBottom:12}}>¡Gracias por la preferencia!</div>
        <div style={{display:'flex',gap:12,justifyContent:'center'}}>
          <button className="login-btn" onClick={handleProceder}>Proceder</button>
          <button className="cliente-btn" onClick={onBack}>Modificar</button>
        </div>
      </div>
      {showPedidoModal && (
        <div className="modal-bg">
          <div className="modal-card" style={{alignItems:'center'}}>
            {!pedidoRegistrado ? (
              <>
                <div style={{fontWeight:700,marginBottom:10}}>Registrando pedido...</div>
                <div style={{width: '80%', height: 8, background: '#f3f4f6', borderRadius: 6, overflow: 'hidden', margin: '18px 0'}}>
                  <div style={{width: '100%', height: '100%', background: 'linear-gradient(90deg,#2563eb 40%,#60a5fa 100%)', animation: 'progressBar 1.8s linear'}} />
                </div>
              </>
            ) : (
              <div style={{fontWeight:700,marginTop:10,color:'#22c55e',fontSize:'1.1rem'}}>Pedido registrado<br />¡Gracias por su preferencia!</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  const [screen, setScreen] = useState('login');
  const [pedido, setPedido] = useState(null);
  const [history, setHistory] = useState([]);
  const [showInfoCocinero, setShowInfoCocinero] = useState(false);
  const [showInfoGerente, setShowInfoGerente] = useState(false);

  // Navegación con historial para botón atrás
  const goTo = (next) => {
    setHistory(h => screen === next ? h : [...h, screen]);
    setScreen(next);
  };
  const goBack = () => {
    setHistory(h => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setScreen(prev);
      return h.slice(0, -1);
    });
  };

  // Helper para renderizar el recuadro con header y contenido
  const renderCard = (title, ContentComponent, props = {}, extraHeader = null) => (
    <div className="app-bg">
      <div className="app-card">
        <div className="app-card-header">
          <button className="back-icon-btn" onClick={goBack} aria-label="Volver">←</button>
          <span className="app-card-title">{title}</span>
          {extraHeader}
        </div>
        <div className="app-card-content">
          <ContentComponent {...props} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {screen === 'login' && <Login onLogin={role => goTo(role)} onForgot={() => goTo('forgot')} onCliente={() => goTo('clienteMenu')} />}
      {screen === 'forgot' && renderCard('Recuperar contraseña', ForgotPassword, { onBack: goBack })}
      {screen === 'cocinero' && renderCard(
        'Pedidos Pendientes',
        props => <Cocinero {...props} onShowInfo={() => setShowInfoCocinero(true)} />, 
        { goBack },
        <button
          className="back-icon-btn"
          style={{ margin: '8px 12px 8px 0' }}
          onClick={() => setShowInfoCocinero(true)}
          aria-label="Ver diagramas"
        >i</button>
      )}
      {screen === 'gerente' && renderCard(
        'Gestión de Insumos',
        props => <Gerente {...props} onShowInfo={() => setShowInfoGerente(true)} />, 
        { goBack },
        <button
          className="back-icon-btn"
          style={{ margin: '8px 12px 8px 0' }}
          onClick={() => setShowInfoGerente(true)}
          aria-label="Ver diagramas"
        >i</button>
      )}
      {screen === 'cliente' && renderCard('Menú del Restaurante', Cliente, { goBack })}
      {screen === 'clienteMenu' && renderCard('Menú del Restaurante', ClienteMenu, { onBack: goBack, onFinalizar: pedido => { setPedido(pedido); goTo('clienteResumen'); } })}
      {screen === 'clienteResumen' && pedido && renderCard('Resumen del pedido', ClienteResumen, { pedido, onBack: () => goTo('clienteMenu'), onProceder: () => goTo('login') })}
      <InfoModal
        open={showInfoCocinero}
        onClose={() => setShowInfoCocinero(false)}
        asIsTitle="Diagrama as-is"
        asIsImg={asispedidosImg}
        toBeTitle="Diagrama to-be"
        toBeImg={tobepedidosImg}
      />
      <InfoModal
        open={showInfoGerente}
        onClose={() => setShowInfoGerente(false)}
        asIsTitle="Diagrama as-is"
        asIsImg={asisinventarioImg}
        toBeTitle="Diagrama to-be"
        toBeImg={tobeinventarioImg}
      />
    </>
  );
}

// Animación global
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.back-btn {
  position: fixed;
  top: 18px;
  left: 12px;
  z-index: 100;
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.5rem;
  color: #2563eb;
  box-shadow: 0 2px 8px rgba(30,41,59,0.10);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #f1f5f9;
}
@keyframes progressBar {
  from { width: 0; }
  to { width: 100%; }
}
`;
document.head.appendChild(style);

export default App;
