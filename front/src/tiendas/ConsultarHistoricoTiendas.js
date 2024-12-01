/* Funcionalidad que permite conocer todas las reservas hechas por una tienda */

import { React, useState, useRef } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function ConsultarHistoricoTiendas () {

  // Hooks.
  const[codTienda, setCodTienda] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API).
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Validar el perfil del usuario.
  if (rolUsuario == 'Segregador' || rolUsuario == 'Marcador') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  }

  const generarLista = (data) => {

    const cuerpoTabla = document.getElementById('cuerpoTabla');

    data.forEach((reserva) => {
      const nuevaFila = document.createElement('tr');
      nuevaFila.innerHTML = `<th scope="row"> ${reserva.codReserva} </th>`;
      cuerpoTabla.appendChild(nuevaFila);
    })
 
  }

  const consultarHistoricoTienda = async (e) => {
    e.preventDefault();

    if (!codTienda) {
      alert('Ingrese el código de la tienda.');
      return;
    }

    await fetch(`http://localhost:3001/historico/${codTienda}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          message = data.message;  
          alert(message);
        } else {
          generarLista(data);
        }
      })

      limpiarFormulario.current.reset();
  }

  return (
    (permitir) ?
    <section className = "container-fluid fondoUsuarios">
      <article className = "row formatoUsuarios">
        <form className = "row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3>CONSULTAR HISTÓRICO DE TIENDA</h3>

          <p>
            <em>
              * Ingrese el código de la tienda que desea consultar. <br/>
            </em>
          </p>

          <div className ="col-md-4">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" onChange = {(e) => setCodTienda(e.target.value)} required placeholder = "Como registra en la base de datos" />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary botonVertical" type="submit" onClick={consultarHistoricoTienda} >Consultar histórico</button>
          </div>
        </form>

        <div className="table-responsive tablaProductos">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"> Código de la reserva</th>
              </tr>
            </thead>
            <tbody id = "cuerpoTabla">
              
            </tbody>
          </table>
        </div>
        
      </article>
      <RegresarAPP />
    </section> : null
  )
};

export default ConsultarHistoricoTiendas;