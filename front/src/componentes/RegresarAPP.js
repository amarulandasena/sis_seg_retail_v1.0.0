/* Botón para regresar a la página principal */

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/formatoUsuarios.css';

function RegresarAPP () {
     
  return (
    <article className = "row formatoUsuarios text-center">
      <Link to = "/PaginaPrincipal">
        <button className ="btn btn-primary" type="button">Regresar a la página principal</button>
      </Link>
    </article>
    )
};

export default RegresarAPP;