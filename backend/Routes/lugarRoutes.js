const { Router } = require('express');
const router = new Router();
const { getLugar, getLugares, createLugar, updateLugar, deleteLugar } = require('../Controllers/lugarController');

router.get('/lugares', getLugares);
router.get('/lugar/:id', getLugar);
router.post('/lugar', createLugar);
router.put('/lugar/:id', updateLugar);
router.delete('/lugar/:id', deleteLugar);

module.exports = router;