/* Módulo para consultar, eliminar o modificar una tienda */

import react from 'react';
import '../css/formatoExterno.css';

function ModEliConsTiendas ({ funcionalidad, accionBoton }) {

  return (
    <article className = "row formatoUsuarios">

      <form className = "row g-3 text-center needs-validation">
        <h3>{funcionalidad}</h3>
        <div className = "col-md-2">
          <div className = "form-check">
            <input className="form-check-input" type="radio" name="exampleRadios" id="opcionCodigoTienda" value="codigo" checked />
            <label className ="form-check-label" htmlFor="opcionCodigoTienda">
              Código de la tienda
            </label>
          </div>
          <div className ="form-check">
            <input className ="form-check-input" type="radio" name="exampleRadios" id="opcionNombreTienda" value="nombre" />
            <label className="form-check-label" htmlFor="opcionNombreTienda">
              Nombre de la tienda
            </label>
          </div>
        </div>
          <div className ="col-md-4">
            <label htmlFor="codigoTienda" className="form-label">Código tienda</label>
            <input type="text" className="form-control" id="codigoTienda" required placeholder = "Como registra en la base de datos" />
          </div>
          <div className ="col-md-4">
            <label htmlFor="nombreTienda" className="form-label">Nombre tienda</label>
            <input type="text" className ="form-control" id="nombreTienda" required placeholder = "Como registra en cámara de comercio" />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" type="submit">{accionBoton}</button>
          </div>
      </form>
    </article>
  )
};

export default ModEliConsTiendas;