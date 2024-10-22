/* Componente para validar las cantidades requeridas de cada producto */

import { React, useState, useRef } from 'react';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function ValidarReservas () {

  // Declaramos los Hooks.
  const[codReserva, setCodReserva] = useState('');

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Validar el perfil del usuario.
  if (rolUsuario != 'Administrador' && rolUsuario != 'Marcador' && rolUsuario != 'Segregador') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  } 

  // Función para validar la reserva.
  const buscarReserva = async (e) => {
    e.preventDefault();

    // Definir el contexto del formulario.
    const cuerpoTabla = document.getElementById('cuerpoTabla');

    // Validamos que todos los datos sean ingresados.
    if (!codReserva){
      alert('Ingrese el código de la reserva.');
    return;
    }

    await fetch(`http://localhost:3001/productosReserva/${codReserva}`)
    .then((response) => response.json())
    .then((data) => {
      if(data.message){
        message = data.message;
        alert(message);
      } else {
        console.log(data);

        data.forEach((prod) => {
          
          let nuevaFila = document.createElement('tr');
          nuevaFila.innerHTML = `<th scope="row"> ${prod.codProducto}  </th>
                                 <th scope="col"> ${prod.codReserva} </th>
                                 <th scope="col"> ${prod.nombreProducto} </th>
                                 <th scope="col"> ${prod.cantidadProducto} </th>`

          cuerpoTabla.appendChild(nuevaFila);

        })
      }
    })
  }


  return (
    (permitir) ?
    <main className = "container-fluid fondoUsuarios">
      <section className = "row formatoUsuarios">
        <form className="row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3> VALIDAR RESERVA </h3>

          <p>
            <em>
              * Ingrese el código de la reserva que desea validar. <br/> 
            </em>
          </p>

          <div className="col-md-4">
            <label htmlFor="codigoReserva" className="form-label">Código reserva</label>
            <input type="text" className="form-control" id="codigoReserva" onChange = {(e)=> setCodReserva(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {buscarReserva} >Buscar</button>
          </div>
        </form>
      </section>

      <section className = "row formatoUsuarios"> 
        <div className="table-responsive tablaProductos">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"> Código del producto</th>
                <th scope="col"> Código de la reserva</th>
                <th scope="col"> Nombre del producto </th>
                <th scope="col"> Cantidad </th>
              </tr>
            </thead>
            <tbody id = "cuerpoTabla">
              
            </tbody>
          </table>
        </div>
      </section> 
      < RegresarAPP />
    </main> : null
  )
}

export default ValidarReservas;