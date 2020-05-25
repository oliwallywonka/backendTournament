// rutas para crear usuarios 
const express = require('express')
const router = express.Router()
const playerController = require('../controllers/PlayerController')
const {check} = require('express-validator')

//crea un usuario
//api/usuarios
router.post('/',
    [
        check('email','El nombre es obligatorio').not().isEmpty(),
        check('email','Agrega un email válido').isEmail(),
        check('password','El password debe se minimo de 6 caractere').isLength({min:6}),
        check('nick','El nick es obligatorio').not().isEmpty(),
        check('nick','El nick debe ser de minimo 4 caracteres').isLength({min:4}),
        check('age','La edad debe ser numerico').isNumeric(),
    ],
    playerController.createPlayer
)
module.exports = router