const { Router } = require ('express');


const { crearUsuario, leerUsuario, actualizarUsuario, eliminarUsuario } = require ('../controllers/usuarioControllers');

const router = Router();

// Petición GET.
router.get('/:numIdentificacion', leerUsuario);

// Petición POST.
router.post('/', crearUsuario);

// Petición PUT.
router.put('/:numIdentificacion', actualizarUsuario);

// Petición DELETE.
router.delete('/:numIdentificacion', eliminarUsuario);

module.exports = router;