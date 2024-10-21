const database = require('../config/database');
const mysql2 = require('mysql2');


const leerProducto = (req, res, next) => {

  const { codReserva } = req.params;

  const leerConsulta = 'SELECT * FROM productosreserva WHERE codReserva = ?;';
  const consulta = mysql2.format(leerConsulta, [codReserva]);

  database.query(consulta, (err, result) => {
    if (err) throw err;

    if (result.length !== 0) {
      res.json(result);
    } else {
      res.json({ message : 'Producto no registrado.'})
    }
  });
}


// Ingresar cada uno de los productos de la reserva en la BBDD.
const crearProductosReserva = (req, res, next) => {

	const { codReserva, codProducto, nombreProducto, cantidadProducto } = req.body;

	const crearConsultaProductos = `INSERT INTO productosreserva(codProducto, codReserva, nombreProducto, cantidadProducto) VALUES(?, ?, ?, ?);`;
	const consulta = mysql2.format(crearConsultaProductos, [codProducto, codReserva, nombreProducto, cantidadProducto]);

	database.query(consulta, (err, result) => {
		if (err)  {
      res.send({message: "Error en el registro del producto."})
      next(err);
		} else{
			res.send({message: 'Producto registrado correctamente.'}); 
		}     
	});

};

const eliminarProductosReserva = (req, res, next) => {

	const { codProducto, codReserva } = req.body;
  
	const eliminarConsulta = `DELETE FROM productosreserva WHERE codProducto = ? AND codReserva = ?;`;
	const consulta = mysql2.format(eliminarConsulta, [codProducto, codReserva]);
  
	database.query(consulta, (err, result) => {
	  if (err) {
		res.json({message : 'Producto no encontrado.'});
		next(err);
	  } else
	  res.json({ message: 'Producto eliminado correctamente.' });
	})
  
  }

  

module.exports = {
  crearProductosReserva,
  eliminarProductosReserva,
  leerProducto
}