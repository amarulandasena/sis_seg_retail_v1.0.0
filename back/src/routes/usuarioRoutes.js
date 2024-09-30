const { Router } = require ('express');

const router = Router();

// Petición GET.
router.get('/', (req, res) => {
    const { nombre, apellido } = req.params;
    res.send(`Su nombre y apellido son: ${nombre} ${apellido} `);
});

// Petición POST.
router.post('/', (req, res) => {
    const { email, contrasegna } = req.body;
    res.send(`${email} : ${contrasegna}`)
});

module.exports = router;