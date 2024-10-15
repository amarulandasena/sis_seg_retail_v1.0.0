/* Componente donde se ingresará la información general de la reserva */

import { React, useState, useRef } from 'react';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

function InfoReserva () {

  // Declaramos los Hooks.
  const[codReserva, setCodReserva] = useState('');
  const[codTienda, setCodTienda] = useState('');
  const[nombreTienda, setNombreTienda] = useState('');
  const[fechaFacturacion, setFechaFacturacion] = useState('');
  const[estadoReserva, setEstadoReserva] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  
  const crearReserva = async (e) => {
    e.preventDefault();

    // Validamos que todos los datos sean ingresados.
    if (!codReserva || !codTienda || !nombreTienda | !fechaFacturacion || !estadoReserva){
      alert('Ingrese todos los datos de la reserva.');
      return;
    }

    let datosReserva = {
      'codReserva' : codReserva,
      'codTienda' : codTienda,
      'nombreTienda' : nombreTienda,
      'fechaFacturacion' : fechaFacturacion,
      'estadoReserva' : estadoReserva
    }

    await fetch('http://localhost:3001/reserva/', {
      method : 'POST',
      headers : {
        'Content-type' : 'application/json',
      },
      body : JSON.stringify(datosReserva),
    })
    .then((response) => response.json())
    .then((data) => {
      message = data.message;
      alert(message);
    });

    limpiarFormulario.current.reset();

  }

  return (

    <main className = "container-fluid fondoUsuarios">
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3> CREAR RESERVA </h3>

          <p>
            <em>
              * Ingrese los datos completos de la reserva. <br/>
              * Recuerde agregar los productos antes de dar clic en el botón para crear la reserva.
            </em>
          </p>

          <div className="col-md-4">
            <label htmlFor="codigoReserva" className="form-label">Código reserva</label>
            <input type="text" className="form-control" id="codigoReserva" onChange = {(e)=> setCodReserva(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" onChange = {(e)=> setCodTienda(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="nombreTienda" className="form-label">Nombre tienda</label>
            <input type="text" className="form-control" id="nombreTienda" onChange = {(e) => setNombreTienda(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="fechaFacturacion" className="form-label">Fecha de facturación</label>
            <input type="date" className="form-control" id="fechaFacturacion" onChange = {(e) => setFechaFacturacion(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="estadoReserva" className="form-label">Estado de la reserva</label>
            <select className="form-select" id="estadoReserva" onChange = {(e) => setEstadoReserva(e.target.value)} required>
              <option selected disabled value="">Seleccione el estado</option>
              <option>FRACCIONADA</option>
              <option>MARCADA</option>
              <option>SEGREGADA</option>
            </select>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {crearReserva} >Crear reserva</button>
          </div>
        </form>
      </section>
    </main>
  )
};

export default InfoReserva;