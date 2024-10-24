import { React, useState, useRef } from 'react';
import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

import RegresarAPP from '../componentes/RegresarAPP';

function EliminarTiendas () {

  const[codTienda, setCodTienda] = useState('');

  // Creamos una variable para almacenar los mensajes enviados por el servidor(API).
  let message = " ";
  let rolUsuario = localStorage.getItem("rolUsuario");
  let permitir = true;

  // Constante para la limpieza del formulario.
  const limpiarFormulario = useRef();

  // Validar el perfil del usuario.
  if (rolUsuario != 'Administrador' && rolUsuario != 'Gerente' && rolUsuario != 'Gerente retail') {
    alert('Usuario no cumple con el perfil.');
    permitir = false;
    return;
  }

  
  const eliminarTienda = async (e) => {
    e.preventDefault();

    if (!codTienda) {
      alert('Ingrese el código de la tienda.');
      return;
    }

    await fetch(`http://localhost:3001/tienda/${codTienda}`, {
      method : 'DELETE',
    })
    .then((response) => response.json()) 
    .then((data) => {
      message = data.message;   
      alert(message); 
    })

    
    limpiarFormulario.current.reset();
  }

  return ( 
    (permitir) ?
    <section className = "container-fluid fondoUsuarios">
      <article className = "row formatoUsuarios">
        <form className = "row g-3 text-center needs-validation" ref = {limpiarFormulario}>
          <h3>ELIMINAR TIENDA</h3>

          <p>
            <em>
              * Ingrese el código de la tienda que desea eliminar. <br/>
            </em>
          </p>

          <div className ="col-md-4">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" onChange = {(e) => setCodTienda(e.target.value)} required placeholder = "Como registra en la base de datos" />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary" type="submit" onClick={eliminarTienda} >ELIMINAR</button>
          </div>
        </form>
      </article>
      < RegresarAPP />
    </section> : null
  )
};

export default EliminarTiendas;