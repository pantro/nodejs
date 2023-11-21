/**
 * 
 * path api/usuarios
 * 
 */
const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getUsuarios } = require('../controllers/usuariosController');

const router = Router();

// Renew del token
router.get('/', validarJWT, getUsuarios);

module.exports = router;