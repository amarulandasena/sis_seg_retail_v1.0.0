const database = require('../config/database');
const mysql2 = require('mysql2');

const crearReserva = (req, res, next) => {

  const {codReserva, codTienda, nombreTienda, fechaFacturacion, estadoReserva } = req.body;

  crearConsulta = `INSERT INTO reserva(codReserva, codTienda, nombreTienda, fechaFacturacion, estadoReserva)
                  VALUES(?, ?, ?, ?, ?);`;
  const consulta = mysql2.format(crearConsulta, [codReserva, codTienda, nombreTienda, fechaFacturacion, estadoReserva]);

  database.query(consulta, (err, result) => {
    if (err)  {
      res.send({message: "Reserva ya existe."})
      next(err);
    } else{
      res.send({message: 'Reserva creada correctamente.'}); 
    }     
  });
};

const actualizarReserva = (req, res, next) => {

  const { codReserva } = req.params;
  const { estadoReserva } = req.body;

  const actualizarConsulta = `UPDATE reserva SET estadoReserva = ? WHERE codReserva = ?;`;
  const consulta = mysql2.format(actualizarConsulta, [estadoReserva, codReserva]);

  database.query(consulta, (err, result) => {
    if (err) throw err;
    res.send({message: "Estado actualizado correctamente."});
  });
}

const eliminarReserva = (req, res, next) => {


  const { codReserva } = req.params;

  const eliminarConsulta = `DELETE FROM reserva WHERE codReserva = ?;`;
  const consulta = mysql2.format(eliminarConsulta, [codReserva]);

  database.query(consulta, (err, result) => {
    if (err) {
      res.json({message : 'Reserva no encontrada.'});
      next(err);
    } else
      res.json({ message: 'Reserva eliminada.' });
  })
}

const leerReserva = (req, res, next) => {

  const { codReserva } = req.params;

  const leerConsulta = `SELECT * FROM reserva WHERE codReserva = ?;`;
  const consulta = mysql2.format(leerConsulta, [codReserva]);

  database.query(consulta, (err, result) => {
    if (err) throw err;

    if (result[0] !== undefined) {
      res.json(result[0]);
    } else {
      res.json({ message: 'Reserva no registrada.' });
    }
  });
}


module.exports = {
	crearReserva,
  actualizarReserva,
  eliminarReserva,
  leerReserva
} 