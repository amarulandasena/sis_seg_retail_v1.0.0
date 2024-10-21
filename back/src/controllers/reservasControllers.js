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

module.exports = {
	crearReserva,
  actualizarReserva
} 