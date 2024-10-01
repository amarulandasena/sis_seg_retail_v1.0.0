// Ingresar al sistema.

import { React, useEffect } from 'react';
import '../css/login.css';

function Login ({funcion, imagen}) {

        useEffect(()=>{
          funcion(false);
          return () => funcion(true);
        },[funcion]);

    return (
        <section className = "container-fluid">
        <div className = "row">
            
            <div className = "col-12 col-md-6 contenedorIngreso">
                <img src = {require (`../imagenes/${imagen}`)}  alt = "logo belcorp" className = "formatologo col-8 col-md-4" />
                <form className = "text-center needs-validation">
                    <div className="mb-3">
                        <label htmlFor="numeroIdentificacion" className="form-label">Número de identificación:</label>
                        <input type="text" className="form-control" id="numeroIdentificacion" aria-describedby="emailHelp" placeholder="Sin puntos ni comas" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasegna" className="form-label">Contraseña:</label>
                        <input type="password" className="form-control" id="contrasegna" placeholder="La asignada por el digitador" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Ingresar</button>
                </form>
                <button type="submit" className="btn btn-link">Olvidaste tu contraseña</button>
            </div>

            
            <aside className = "col-12 col-md-6 formatoPlanta">

            </aside>
        </div>    
    </section>
    )
};

export default Login;