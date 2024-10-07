const { Router } = require ('express');

const { crearReserva } = require('../controllers/reservasControllers');

const router = Router();

// Petición POST.
router.post('/', crearReserva);

module.exports = router;