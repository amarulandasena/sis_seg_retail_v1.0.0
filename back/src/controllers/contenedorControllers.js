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

  const actualizarConsulta = `UPDATE contenedor SET codSalida = ?, fechaFacturacion = ?, codTienda = ?, codReserva = ? 
                              WHERE codContenedor = ?;`;
  const consulta = mysql2.format(actualizarConsulta, [codSalida, fechaFacturacion, codTienda, codReserva, codContenedor]);

  database.query(consulta, (err, result) => {
    if (err) {
      res.send({message : "Etiqueta no encontrada."})
      next(err);
    } else {
      res.send({message: "Etiqueta actualizada correctamente."});
    }
  });
};

const eliminarEtiqueta = (req, res, next) => {

  const { codContenedor } = req.params;

  const eliminarConsulta = `DELETE FROM contenedor WHERE codContenedor = ?;`;
  const consulta = mysql2.format(eliminarConsulta, [codContenedor]);

  database.query(consulta, (err, result) => {
    if (err) {
      res.send({message : 'Etiqueta no encontrada.'});
      next(err);
    } else {
      res.send({ message: 'Etiqueta eliminada.' });
    }
    
  })
};

const leerEtiqueta = (req, res, next) => {   

  const { codContenedor } = req.params;

  const leerConsulta = `SELECT * FROM contenedor WHERE codContenedor = ?;`;
  const consulta = mysql2.format(leerConsulta, [codContenedor]);

  database.query(consulta, (err, result) => {
    if (err) throw err;

    if (result[0] !== undefined) {
      res.json(result[0]);
    } else {
      res.json({ message: 'Etiqueta no registrada.' });
    }
  });
}; 

module.exports = {
  crearEtiqueta,
  actualizarEtiqueta,
  eliminarEtiqueta,
  leerEtiqueta
}