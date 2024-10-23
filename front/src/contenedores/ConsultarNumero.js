/* Funcionalidad que permite eliminar una etiqueta de la base de datos */

import { React, useState, useRef } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function ConsultarNumero () {

  //Hooks.
  const[codContenedor, setCodContenedor] = useState('');
  const[codSalida, setCodSalida] = useState('');
  const[fechaFacturacion, setFechaFacturacion] = useState('');
  const[codTienda, setCodTienda] = useState('');
  const[codReserva, setCodReserva] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Validar el perfil del usuario.
  if (rolUsuario != 'Auxiliar de operaciones' && rolUsuario != 'Supervisor' && rolUsuario != 'Segregador' && rolUsuario != 'Administrador') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  }

  // Función para consultar la información de la etiqueta.
  const consultarEtiqueta = async (e) => {
    e.preventDefault();

    if (!codContenedor) {
      alert('Ingrese el código del contenedor.');
      return;
    }

    await fetch(`http://localhost:3001/contenedores/${codContenedor}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        message = data.message;  
        alert(message);
      } else {
        setCodSalida(data.codSalida);
        setFechaFacturacion(data.fechaFacturacion);
        setCodTienda(data.codTienda);
        setCodReserva(data.codReserva);
      }
    })

    limpiarFormulario.current.reset();
  }

  return (
    (permitir) ?
    <main className = "container-fluid fondoUsuarios">
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3> CONSULTAR NÚMERO DE CONTENEDOR </h3>

          <p>
            <em>
              * Ingrese el código de la etiqueta que desea consultar. <br/>
            </em>
          </p>
          <div className="col-md-4">
            <label htmlFor="codigoContenedor" className="form-label">Código contenedor</label>
            <input type="text" className="form-control" id="codigoContenedor" onChange = {(e)=> setCodContenedor(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {consultarEtiqueta} >Consultar</button>
          </div>
        </form>

        <div className = "row tablaProductos">
          <p> <strong> Datos del contenedor </strong> </p>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"> Código del contenedor </th>
                  <th scope="col"> Código de la salida </th>
                  <th scope="col"> Fecha de facturación</th>
                  <th scope="col"> Código de la tienda </th>
                  <th scope="col"> Código de la reserva </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"> {codContenedor} </th>
                  <th scope="col"> {codSalida} </th>
                  <th scope="col"> {fechaFacturacion} </th>
                  <th scope="col"> {codTienda} </th>
                  <th scope="col"> {codReserva} </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      < RegresarAPP />
    </main> : null
  )
};

export default ConsultarNumero;