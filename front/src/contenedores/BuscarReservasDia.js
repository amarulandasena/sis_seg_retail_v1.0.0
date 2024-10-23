/* Componente que permite filtrar las reservas y saber que ya registran como segregadas */

import { React, useState, useRef } from 'react';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

function BuscarReservasDia () {

  // Hooks.
  const[codTienda, setCodTienda] = useState('');
  const[fechaFacturacion, setFechaFacturacion] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Función para generar el listado de reservas.
  const generarLista = (data) => {

    console.log(data);
    // Definir el contexto del formulario.
    const cuerpoTabla = document.getElementById('cuerpoTabla1');

    let data1 = [];
    
    data1 = data.filter(reserva => reserva.fechaFacturacion == fechaFacturacion && reserva.estadoReserva == 'SEGREGADA');

    data1.forEach((reserva) => {

      let nuevaFila = document.createElement('tr');
      nuevaFila.innerHTML = `<th scope="row"> ${reserva.codReserva} </th>`;
      cuerpoTabla.appendChild(nuevaFila);

    })

  }

  // Función para recuperar las reservas hechas por la tienda en una determinada fecha.
  const buscarReservas = async (e) => {
    e.preventDefault();

    // Validamos que todos los datos sean ingresados.
    if (!codTienda || !fechaFacturacion){
      alert('Ingrese todos los datos necesarios');
      return;
    }

    await fetch(`http://localhost:3001/cargarProductos/${codTienda}`)
    .then((response) => response.json())
    .then((data) => {
      if(data.message) {
        message = data.message;
        alert(message);
      } else {
        generarLista(data);
      }
    })

    limpiarFormulario.current.reset();
  }

  return (
    <main className = "container-fluid fondoUsuarios">
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <p>
            <em>
              * Ingrese el código de la tienda y la fecha de facturación. <br/> 
            </em>
          </p>

          <div className="col-md-4">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" onChange = {(e)=> setCodTienda(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="fechaFacturacion" className="form-label">Fecha de facturación</label>
            <input type="date" className="form-control" id="fechaFacturacion" onChange = {(e) => setFechaFacturacion(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {buscarReservas} >Buscar reservas</button>
          </div>
        </form>
      </section>

      <section className = "row formatoUsuarios">
        <p> <strong> Códigos de las reservas </strong> </p>
        <div className="table-responsive ">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"> Código reserva </th>
              </tr>
            </thead>
            <tbody id = "cuerpoTabla1">

            </tbody>
          </table>
        </div> 
      </section>
    </main>
  )
}

export default BuscarReservasDia;