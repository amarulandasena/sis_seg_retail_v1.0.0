// Página de inicio.
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/paginaPrincipal.css';

function PaginaPrincipal (props) {
  return (
  <section className = "container-fluid fondoSeccion">
    <article className = "row">
      <div className = "col-12 col-xl-3 formatoPresentacionFundacion">
        <h1> POTENCIAMOS EL EMPRENDIMIENTO FEMENINO EN AMÉRICA LATINA. </h1>
        <img src = {require(`../imagenes/${props.imageFundacionBelcorp}`)} alt = "Fundación belcorp" id = "logoFundacion" />				
      </div>
      <div className = "col-12 col-xl-8 formatoInfoFundacion">
        <h3> NUESTROS PROGRAMAS </h3>
        <p>
          Impulsamos el potencial de la mujer para transformar la sociedad. A través de programas que fortalecen su 
          liderazgo y capacidades emprendedoras, buscamos contribuir a su empoderamiento económico y a la construcción 
          de una sociedad más equitativa.
        </p>

        <h3> EMPRENDIENDO AVANZAMOS </h3>
        <p>
          El programa fortalece las habilidades blandas y competencias emprendedoras de los estudiantes, a través de 
          metodologías innovadoras y bajo un enfoque de igualdad de oportunidades, involucrando a actores clave de la 
          comunidad educativa. Trabajamos este programa de la mano de organizaciones aliadas a nivel regional.
        </p>

        <h3> MUJERES SIN LÍMITES </h3>
        <p>
          El programa fortalece el liderazgo y autoconfianza de mujeres emprendedoras y potencia sus habilidades en gestión 
          de negocios a través de sesiones de capacitación, mentoría y asesoría técnica.
        </p>
      </div>
    </article>

    <article className = "row formatoAccesosYproductos">
      <div className = "col-12 col-sm-3 col-xl-3" id = "accesosDirectos">
        <h3> ACCESOS DIRECTOS </h3>
        <ul>
          <li><Link to="/ConsultarUsuarios" className="dropdown-item formatoMenu">Consultar usuario</Link></li>
          <li><Link to="/CrearReservas" className="dropdown-item formatoMenu">Crear reserva</Link></li>
          <li><Link to="/RegistrarMarcado" className="dropdown-item formatoMenu">Registrar marcado</Link></li>
          <li><Link to="/RegistrarSegregado" className="dropdown-item formatoMenu">Ingresar segregado</Link></li>
          <li><Link to = "">Generar productividad diaria</Link></li>
          <li><Link to = "">Elaborar informe de novedades</Link></li>
        </ul>
      </div>
      <div className = "col-12 col-sm-9 col-xl-9 formatoFondoCatalogos">
        <h3> NUEVOS PRODUCTOS </h3>
        <div className = "distribucionCatalogos">
          <a href = "https://belcorp.esika.com/co/catalogo-virtual/" target = "_blank" rel="noreferrer">
            <img src = {require(`../imagenes/${props.imagenEsika}`)} alt = "Esika" class = "formatoCatalogos" />
          </a>
          <a href = "https://lbel.tiendabelcorp.com.co/" target = "_blank" rel="noreferrer">
            <img src = {require(`../imagenes/${props.imagenLbel}`)} alt = "Lbel" class = "formatoCatalogos" />
          </a>
          <a href = "https://cyzone.tiendabelcorp.com.co/" target = "_blank" rel="noreferrer">
            <img src = {require(`../imagenes/${props.imagenCyzone}`)} alt = "Cyzone" class = "formatoCatalogos" />
          </a>     
        </div>
      </div>
    </article>

    <article className = "row formatoFamilia">
      <h3> NUESTRA FAMILIA BEL STAR </h3>
      <div className = "col-12 col-xl-2 text-center">
          <img src = {require(`../imagenes/${props.colaborador1}`)} alt = "Marcos Resca" class = "formatoFotoColaborador rounded" />
          <p className = "text-center">Marcos Resca</p>
      </div>
      <p className = "col-12 col-xl-2">
          "El éxito es hacer cosas ordinarias extraordinariamente bien." Jim Rohn
      </p>
      <div className = "col-12 col-xl-2 text-center">
          <img src = {require(`../imagenes/${props.colaborador2}`)} alt = "Veronica Melzi" class = "formatoFotoColaborador rounded" />
          <p className = "text-center">Veronica Melzi</p>
      </div>
      <p className = "col-12 col-xl-2">
          "No te lamentes por el pasado, ni te preocupes por el futuro, concéntrate en vivir el presente." Buddha
      </p>
      <div className = "col-12 col-xl-2 text-center">
          <img src = {require(`../imagenes/${props.colaborador3}`)} alt = "Erika Herrero" class = "formatoFotoColaborador rounded" />
          <p className = "text-center">Érika Herrero</p>
      </div>
      <p className = "col-12 col-xl-2">
          "El mayor valor de la vida no es los que consigues, el mayor valor de la vida es en lo que te conviertes." Jim Rohn
      </p>
    </article>
  </section>
  )
}

export default PaginaPrincipal;