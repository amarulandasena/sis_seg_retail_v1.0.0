import React from 'react';

import '../css/formatoExterno.css';
import '../css/formatoInterno.css';

function MensajeIngresoDatos () {
  return (
    <div className = "row" >
      <p>
        <em>
            * Para actualizar o consultar los datos, <strong> EVITE PRESIONAR ENTER </strong>.<br/>
            * De clic en el botón correspondiente.  
        </em>
      </p>
    </div>
  )
};


export default MensajeIngresoDatos; 