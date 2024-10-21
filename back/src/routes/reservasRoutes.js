const { Router } = require ('express');

const { crearReserva, actualizarReserva } = require('../controllers/reservasControllers');

const router = Router();

// Petición POST.
router.post('/', crearReserva);

// Petición PUT.
router.put('/:codReserva', actualizarReserva);

module.exports = router;