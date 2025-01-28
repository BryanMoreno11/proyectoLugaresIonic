const { Router } = require('express');
const router = new Router();
const { getUsuario, getUsuarios, createUsuario, updateUsuario, deleteUsuario, iniciarSesion } = require('../Controllers/usuarioController');

router.get('/usuarios', getUsuarios);
router.get('/usuario/:id', getUsuario);
router.post('/usuario', createUsuario);
router.put('/usuario/:id', updateUsuario);
router.delete('/usuario/:id', deleteUsuario);
router.post('/usuario/iniciar-sesion', iniciarSesion);

module.exports = router;