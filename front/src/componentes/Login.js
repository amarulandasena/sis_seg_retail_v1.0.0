// Ingresar al sistema.

import { React, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/login.css';

function Login ({funcion, imagen}) {

  // Ocultamos la barra de navegación.
  useEffect(()=>{
    funcion(false);
    return () => funcion(true);
  },[funcion]);

  const[numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const[contrasegna, setContrasegna] = useState('');

  const navegar = useNavigate();

  const limpiarFormulario = useRef();

  const ingresar = async (e) => {
    e.preventDefault();
    
    if (!numeroIdentificacion || !contrasegna){
      alert('Ingrese su usuario y/o contraseña.')
      return;
    }

    let datosUsuario = {
      'numIdentificacion' : numeroIdentificacion,
      'contrasegna' : contrasegna
    }

    await fetch('http://localhost:3001/login' , {
      method : 'POST',
      headers :  {
        'Content-type' : 'application/json',
      },
      body : JSON.stringify(datosUsuario),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.logueado){
        alert('Bienvenido.')
        navegar('/PaginaPrincipal');
      } else {
        alert('Usuario no registrado.')
      }
    });

    limpiarFormulario.current.reset();
  }

  return (
    <section className = "container-fluid">
      <div className = "row">
          
        <div className = "col-12 col-md-6 contenedorIngreso">
            <img src = {require (`../imagenes/${imagen}`)}  alt = "logo belcorp" className = "formatologo col-8 col-md-4" />
            <form className = "text-center needs-validation" ref = {limpiarFormulario}>
                <div className="mb-3">
                    <label htmlFor="numeroIdentificacion" className="form-label">Número de identificación:</label>
                    <input type="text" className="form-control" id="numeroIdentificacion" onChange = {(e) => setNumeroIdentificacion(e.target.value)} aria-describedby="emailHelp" placeholder="Sin puntos ni comas" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="contrasegna" className="form-label">Contraseña:</label>
                    <input type="password" className="form-control" id="contrasegna" onChange = {(e) => setContrasegna(e.target.value)} placeholder="La asignada por el digitador" required />
                </div>
                <button type="submit" className="btn btn-primary" onClick = {ingresar}>Ingresar</button>
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