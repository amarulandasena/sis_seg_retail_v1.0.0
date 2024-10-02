import './App.css';
import PieDePagina from './componentes/PieDePagina';
import BarraDeNavegacion from './componentes/BarraDeNavegacion';
import Certificaciones from './componentes/Certificaciones';
import Login from './componentes/Login';
import PaginaPrincipal from './componentes/PaginaPrincipal';
import Usuarios from './usuarios/Usuarios';

import { Routes, Route} from "react-router-dom";
import { useState } from 'react';

function App() {

  const [banderaBarra, setBanderaBarra] = useState(true);

  return (
    <div className="App">

      <BarraDeNavegacion 
        banderaBarra = {banderaBarra}
        imagen = 'logo_belcorp.png' />
      
      <Routes>
        <Route path = '/' element = {< Login  
          imagen = 'logo_belcorp.png'
          funcion = {setBanderaBarra}/>} />

        <Route path = '/PaginaPrincipal' element = {< PaginaPrincipal 
          imageFundacionBelcorp = 'fundacionBelcorp3.jpeg'
          imagenEsika = 'esika.jpg'
          imagenCyzone = 'cyzone.jpg'
          imagenLbel = 'lbel1.jpg'
          colaborador1 = 'colaborador1.jpg'
          colaborador2 = 'colaborador2.jpg'
          colaborador3 = 'colaborador3.jpg'
          />} />

        <Route path = '/Usuarios' element = {< Usuarios />} />
      </Routes>
      
      < Certificaciones 
        certificacion1 = 'certificacionBasc1.jpeg'
        certificacion2 = 'certifcacionBunny1.jpeg'
        certificacion3 = 'operadorEconomico1.jpeg'
        certificacion4 = 'iso9901.png'/>
      < PieDePagina />

    </div>
  );
}

export default App;
