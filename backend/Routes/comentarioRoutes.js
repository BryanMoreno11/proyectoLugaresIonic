const { Router } = require('express');
const router = new Router();
const { getComentario, getComentariosPorLugar, createComentario, updateComentario, deleteComentario } = require('../Controllers/comentarioController');

router.get('/comentario/:id', getComentario);
router.get('/comentarios/lugar/:lugarId', getComentariosPorLugar);
router.post('/comentario', createComentario);
router.put('/comentario/:id', updateComentario);
router.delete('/comentario/:id', deleteComentario);

module.exports = router;