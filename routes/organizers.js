// rutas para crear usuarios 
const express = require('express')
const router = express.Router()
const organizerController = require('../controllers/organizerController')
const {check} = require('express-validator')

//crea un usuario
//api/usuarios
router.post('/',
    [
        check('email','El email es obligatorio').not().isEmpty(),
        check('email','Agrega un email válido').isEmail(),
        check('password','El password debe se minimo de 6 caractere').isLength({min:6}),
        check('name','El nick es obligatorio').not().isEmpty(),
        check('name','El nick debe ser de minimo 4 caracteres').isLength({min:4}),
    ],
    organizerController.createOrganizer
)
module.exports = router