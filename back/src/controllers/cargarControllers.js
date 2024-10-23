const database = require('../config/database');
const mysql2 = require('mysql2');

const leerCodigosReservas = (req, res, next) => {

  const { codTienda } = req.params;

  const leerConsulta = `SELECT codReserva, fechaFacturacion FROM reserva WHERE codTienda = ?;`;
  const consulta = mysql2.format(leerConsulta, [codTienda]);

  database.query(consulta, (err, result) => {
    if (err) throw err;

    if (result.length !== 0) {
      res.json(result);
    } else {
      res.json({ message : 'Tienda no registra historial.'})
    }
  });

}


module.exports = {
  leerCodigosReservas
}