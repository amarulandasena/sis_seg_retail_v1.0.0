const { Router } = require ('express');

const { crearReserva, actualizarReserva, eliminarReserva, leerReserva } = require('../controllers/reservasControllers');

const router = Router();

// Petición POST.
router.post('/', crearReserva);

// Petición PUT.
router.put('/:codReserva', actualizarReserva);

// Petición DELETE.
router.delete('/:codReserva', eliminarReserva);

// Petición GET.
router.get('/:codReserva', leerReserva);

module.exports = router;