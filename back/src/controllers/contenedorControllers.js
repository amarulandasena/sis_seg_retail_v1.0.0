const database = require('../config/database');
const mysql2 = require('mysql2');

const crearEtiqueta = (req, res, next) => {

  const { codContenedor, codSalida, codReserva, codTienda, fechaFacturacion } = req.body;

  crearConsulta = `INSERT INTO contenedor(codContenedor, codSalida, fechaFacturacion, codTienda, codReserva )
                  VALUES(?, ?, ?, ?, ?);`;
  const consulta = mysql2.format(crearConsulta, [codContenedor, codSalida, fechaFacturacion, codTienda, codReserva]);

  database.query(consulta, (err, result) => {
    if (err)  {
      res.send({message: "Etiqueta ya existe."})
      next(err);
    } else{
      res.send({message: 'Etiqueta creada correctamente.'}); 
    }     
  });
};

const actualizarEtiqueta = (req, res, next) => {

  const { codContenedor } = req.params;
  const { codSalida, codReserva, codTienda, fechaFacturacion } = req.body;

  const actualizarConsulta = `UPDATE contenedor SET codSalida = ?, fechaFacturacion = ?, codTienda = ?, codReserva = ? WHERE codContenedor = ?;`;
  const consulta = mysql2.format(actualizarConsulta, [codSalida, fechaFacturacion, codTienda, codReserva, codContenedor]);

  database.query(consulta, (err, result) => {
    if (err) throw err;
    res.send({message: "Etiqueta actualizada correctamente."});
    
  });
}

module.exports = {
  crearEtiqueta,
  actualizarEtiqueta
}