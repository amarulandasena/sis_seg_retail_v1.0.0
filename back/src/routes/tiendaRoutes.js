const { Router } = require ('express');

const { crearTienda, actualizarTienda, leerTienda, eliminarTienda } = require('../controllers/tiendaControllers');

const router = Router();

// Petición GET.
router.get('/:codTienda', leerTienda);

// Petición POST.
router.post('/', crearTienda);

// Petición PUT.
router.put('/:codTienda', actualizarTienda);

// Petición DELETE.
router.delete('/:codTienda', eliminarTienda);

module.exports = router;