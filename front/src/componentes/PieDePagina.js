// Pie de página para todas las vistas.

import React from 'react';
import '../css/componentesComunes.css';

function PieDePagina () {
    return (
        <footer className = "container-fluid">
            <div className = "row pieDePagina">
                <p className = "col-12 col-md-2">Copyright©2024</p>
                <p className = "col-12 col-md-8">BEL STAR S.A. Todos los derechos reservados. Tocancipá, Cundinamarca.</p>
                <p className = "col-12 col-md-2">By A&D Soft</p>
            </div>   
        </footer>
    )
};

export default PieDePagina;