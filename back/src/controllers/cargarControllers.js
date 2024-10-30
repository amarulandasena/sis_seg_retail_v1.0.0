const database = require('../config/database');
const mysql2 = require('mysql2');
const asyncHandler = require('express-async-handler');

const leerCodigosReservas = asyncHandler (async(req, res, next) => {

  const { codTienda } = req.params;

  const leerConsulta = `SELECT codReserva, fechaFacturacion, estadoReserva FROM reserva WHERE codTienda = ?;`;
  const consulta = await mysql2.format(leerConsulta, [codTienda]);

  database.query(consulta, (err, result) => {
    if (err) throw err;

    if (result.length !== 0) {
      res.json(result);
    } else {
      res.json({ message : 'Tienda no registra historial.'})
    }
  });

});


module.exports = {
  leerCodigosReservas
}