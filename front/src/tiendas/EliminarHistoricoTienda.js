import { React, useState, useRef } from 'react';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function EliminarHistoricoTienda () {

  // Hooks.
  const[codTienda, setCodTienda] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API).
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Validar el perfil del usuario.
  if (rolUsuario != 'Administrador' && rolUsuario != 'Digitador' && rolUsuario != 'Supervisor') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  }

  // Función para validar que la tienda existe.
  const buscarTienda = async (e) => {
    e.preventDefault();

    if (!codTienda) {
      alert('Ingrese el código de la tienda.');
      return;
    }

    await fetch(`http://localhost:3001/tienda/${codTienda}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          message = data.message;  
          alert(message);
        } else {
          alert("Tienda registrada.")
        }
    })

  }

  // Función para eliminar el historial de la BBDD.
  const eliminarHistorial = async () => {
   
    await fetch(`http://localhost:3001/historico/${codTienda}`, {
      method : 'DELETE',
    })
    .then((response) => response.json()) 
    .then((data) => {
      message = data.message;  
      alert(message);  
    })
    limpiarFormulario.current.reset();
  }

  // Función para eliminar los productos de la reserva.
  const eliminarProductosReserva = async (codReserva) => {

    await fetch(`http://localhost:3001/productosReserva/${codReserva}`, {
      method : 'DELETE',
    })
    .then((response) => response.json())
    .then((data) => {
      message = data.message;
      alert(message);
    })

  }

  // Función para consultar el listado de reservas.
  const consultarHistoricoTienda = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:3001/historico/${codTienda}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          message = data.message;  
          alert(message);
        } else {
          console.log(data);

          data.forEach((reserva) => {
            eliminarProductosReserva(reserva.codReserva);
          })

          eliminarHistorial();
        }
      })
  }

  return (
    (permitir) ?
    <section className = "container-fluid fondoUsuarios">
      <article className = "row formatoUsuarios">
        <form className = "row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3>ELIMINAR HISTORIAL</h3>

          <p>
              <em>
                * Ingrese el código de la tienda. <br/>
              </em>
          </p>

          <div className ="col-md-4">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" onChange = {(e) => setCodTienda(e.target.value)} required placeholder = "Como registra en la base de datos" />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary" type="submit" onClick={buscarTienda}>BUSCAR</button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary" type="submit" onClick={consultarHistoricoTienda} >ELIMINAR</button>
          </div>
        </form>
      </article>  
      < RegresarAPP />
    </section> : null
  )
};

export default EliminarHistoricoTienda;