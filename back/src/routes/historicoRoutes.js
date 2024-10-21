const { Router } = require ('express');

const { eliminarHistorico, leerHistorico } = require ('../controllers/historicoControllers');

const router = Router();

// Petición DELETE Historial.
router.delete('/:codTienda', eliminarHistorico);

// Petición GET Historial.
router.get('/:codTienda', leerHistorico);

module.exports = router;

