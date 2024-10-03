import React from 'react';
import CrearModUsuarios from './CrearModUsuarios';
import EliConsUsuario from './EliConsUsuario';
import RegresarAPP from '../componentes/RegresarAPP';

import '../css/formatoUsuarios.css';

function Usuarios (){
    return (
      <section className = "container-fluid fondoUsuarios">
        < CrearModUsuarios />
        < EliConsUsuario
          funcionalidad = 'ELIMINAR USUARIO'
          accionBoton = 'Eliminar' />
        < EliConsUsuario
          funcionalidad = 'CONSULTAR USUARIO'
          accionBoton = 'Consultar' />
        <RegresarAPP />
      </section>    
    )
};

export default Usuarios;