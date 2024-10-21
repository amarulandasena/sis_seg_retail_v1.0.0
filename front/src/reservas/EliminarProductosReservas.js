/* Componente para eliminar productos de una reserva */
import { React, useState, useRef } from 'react';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

function EliminarProductosReservas () {

  // Hooks.
  const[codReserva, setCodReserva] = useState('');
  const[codProducto, setCodProducto] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API) y el perfil del usuario.
  let message = " ";

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Objeto para almacenar los productos en el arreglo.
  let detalleProducto = {
    'codProducto' : codProducto,
    'codReserva' : codReserva
  }

  // Función para eliminar un producto de una reserva.
  const eliminarProducto = async (e) => {
    e.preventDefault();

    // Validamos que todos los datos sean ingresados.
    if (!codReserva || !codProducto){
      alert('Ingrese todos los datos.');
    return;
    }

    await fetch(`http://localhost:3001/productosReserva/${codProducto}`, {
      method : 'DELETE',
      headers : {
        'Content-type' : 'application/json',
      },
      body : JSON.stringify(detalleProducto),
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
          <h3> ELIMINAR PRODUCTOS </h3>

          <div className="col-md-4">
            <label htmlFor="codigoReserva" className="form-label">Código reserva</label>
            <input type="text" className="form-control" id="codigoReserva" onChange = {(e)=> setCodReserva(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="codProducto" className="form-label">Código del producto</label>
            <select className="form-select" id="codProducto" onChange = {(e) => setCodProducto(e.target.value)} required>
              <option selected disabled value="">Seleccione el código</option>
              <option>20-0039855</option>
              <option>20-0060760</option>
              <option>20-0064310</option>
              <option>20-0064341</option>
              <option>20-0072913</option>
              <option>20-0078924</option>
              <option>20-0078932</option>
              <option>20-0082481</option>
              <option>20-0082678</option>
              <option>20-0082687</option>
              <option>20-0082688</option>
              <option>20-0082974</option>
              <option>20-0083916</option>
              <option>20-0083940</option>
              <option>20-0083952</option>
              <option>20-0084293</option>
              <option>20-0084882</option>
              <option>20-0085806</option>
              <option>20-0086107</option>
              <option>20-0086172</option>
              <option>20-0086399</option>
              <option>20-0086432</option>
            </select>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary margenBoton" type="submit" onClick = {eliminarProducto}>Eliminar</button>
          </div>
        </form>
      </section>
    </main>
  )
};

export default EliminarProductosReservas;

