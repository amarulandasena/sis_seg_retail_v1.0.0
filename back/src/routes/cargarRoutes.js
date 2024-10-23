const { Router } = require ('express');

const { leerCodigosReservas } = require('../controllers/cargarControllers');

const router = Router();

// Petición GET reservas fecha de facturación.
router.get('/:codTienda', leerCodigosReservas);

module.exports = router;