import React from 'react';
import CrearModUsuarios from './CrearModUsuarios';
import EliConsUsuario from './EliConsUsuario';
import RegresarAPP from '../componentes/RegresarAPP';

import '../css/formatoUsuarios.css';

function Usuarios (){
    return (
      <section className = "container-fluid fondoUsuarios">
        < CrearModUsuarios />
        < EliConsUsuario />
        <RegresarAPP />
      </section>    
    )
};

export default Usuarios;